import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isAxiosError } from 'axios';
import {
  firstValueFrom,
  retryWhen,
  scan,
  delay,
  map,
  catchError,
} from 'rxjs';

type RetryableConfig = AxiosRequestConfig & {
  /** Nombre de retries sur erreurs transitoires (timeout/502/503/504) */
  retries?: number;        // default via env
  /** Délai entre retries (ms) */
  retryDelayMs?: number;   // default via env
  /** Si true, renvoie AxiosResponse complet, sinon resp.data */
  returnFullResponse?: boolean;
};

@Injectable()
export class HttpClientService {
  private readonly defaultRetries = Number(process.env.HTTP_RETRIES ?? 1);
  private readonly defaultRetryDelayMs = Number(process.env.HTTP_RETRY_DELAY_MS ?? 300);

  constructor(private readonly http: HttpService) {}

  /** Normalisation des erreurs (garde ta logique) */
  private toHttpException(err: any): HttpException {
    if (isAxiosError(err)) {
      const upstreamStatus = err.response?.status;
      const code = err.code;
      const timedOut =
        code === 'ECONNABORTED' ||
        (typeof err.message === 'string' && err.message.includes('timeout'));

      if (timedOut) {
        return new HttpException(
          {
            message: 'Upstream timeout',
            cause: 'ECONNABORTED',
            upstreamStatus,
            method: err.config?.method?.toUpperCase(),
            url: err.config?.url,
          },
          HttpStatus.GATEWAY_TIMEOUT,
        );
      }

      if (!upstreamStatus) {
        return new HttpException(
          {
            message: 'Upstream unreachable',
            cause: err.message,
            method: err.config?.method?.toUpperCase(),
            url: err.config?.url,
          },
          HttpStatus.BAD_GATEWAY,
        );
      }

      return new HttpException(
        err.response?.data ?? { message: 'Upstream error' },
        upstreamStatus,
      );
    }

    return new HttpException(
      { message: err?.message ?? 'Unknown error' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  /** Pipeline commun: retry (transitoires) -> map data -> normalize error */
  private async run<T>(
    obs: import('rxjs').Observable<AxiosResponse<T>>,
    cfg?: RetryableConfig,
  ): Promise<T> {
    const retries = cfg?.retries ?? this.defaultRetries;
    const retryDelayMs = cfg?.retryDelayMs ?? this.defaultRetryDelayMs;

    const stream = obs.pipe(
      retryWhen(errors =>
        errors.pipe(
          scan((attempt, error: any) => {
            const status = error?.response?.status as number | undefined;
            const code = error?.code as string | undefined;
            const retriable =
              code === 'ECONNABORTED' || [502, 503, 504].includes(status ?? 0);
            if (retriable && attempt < retries) return attempt + 1;
            throw error;
          }, 0),
          delay(retryDelayMs),
        ),
      ),
      map((resp) => (cfg?.returnFullResponse ? (resp as any) : resp.data)),
      catchError((err) => {
        throw this.toHttpException(err);
      }),
    );

    return firstValueFrom(stream);
  }

  /** GET/POST/PUT/PATCH/DELETE minces qui passent par run() */
  get<T>(url: string, config?: RetryableConfig): Promise<T> {
    return this.run<T>(this.http.get<T>(url, config), config);
  }

  post<T>(url: string, data?: any, config?: RetryableConfig): Promise<T> {
    return this.run<T>(this.http.post<T>(url, data, config), config);
  }

  put<T>(url: string, data?: any, config?: RetryableConfig): Promise<T> {
    return this.run<T>(this.http.put<T>(url, data, config), config);
  }

  patch<T>(url: string, data?: any, config?: RetryableConfig): Promise<T> {
    return this.run<T>(this.http.patch<T>(url, data, config), config);
  }

  delete<T>(url: string, config?: RetryableConfig): Promise<T> {
    return this.run<T>(this.http.delete<T>(url, config), config);
  }
}
