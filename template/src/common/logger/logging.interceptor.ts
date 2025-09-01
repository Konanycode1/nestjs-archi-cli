import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { stringify } from 'flatted';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    // Log request metadata (use safe stringify)
    const request = context.switchToHttp().getRequest();
    // console.log('Request Info:', stringify(request));

    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
