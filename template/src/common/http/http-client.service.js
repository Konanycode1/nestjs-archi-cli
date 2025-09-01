var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { firstValueFrom, retryWhen, scan, delay, map, catchError, } from 'rxjs';
let HttpClientService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HttpClientService = _classThis = class {
        constructor(http) {
            this.http = http;
            this.defaultRetries = Number(process.env.HTTP_RETRIES ?? 1);
            this.defaultRetryDelayMs = Number(process.env.HTTP_RETRY_DELAY_MS ?? 300);
        }
        /** Normalisation des erreurs (garde ta logique) */
        toHttpException(err) {
            if (isAxiosError(err)) {
                const upstreamStatus = err.response?.status;
                const code = err.code;
                const timedOut = code === 'ECONNABORTED' ||
                    (typeof err.message === 'string' && err.message.includes('timeout'));
                if (timedOut) {
                    return new HttpException({
                        message: 'Upstream timeout',
                        cause: 'ECONNABORTED',
                        upstreamStatus,
                        method: err.config?.method?.toUpperCase(),
                        url: err.config?.url,
                    }, HttpStatus.GATEWAY_TIMEOUT);
                }
                if (!upstreamStatus) {
                    return new HttpException({
                        message: 'Upstream unreachable',
                        cause: err.message,
                        method: err.config?.method?.toUpperCase(),
                        url: err.config?.url,
                    }, HttpStatus.BAD_GATEWAY);
                }
                return new HttpException(err.response?.data ?? { message: 'Upstream error' }, upstreamStatus);
            }
            return new HttpException({ message: err?.message ?? 'Unknown error' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        /** Pipeline commun: retry (transitoires) -> map data -> normalize error */
        async run(obs, cfg) {
            const retries = cfg?.retries ?? this.defaultRetries;
            const retryDelayMs = cfg?.retryDelayMs ?? this.defaultRetryDelayMs;
            const stream = obs.pipe(retryWhen(errors => errors.pipe(scan((attempt, error) => {
                const status = error?.response?.status;
                const code = error?.code;
                const retriable = code === 'ECONNABORTED' || [502, 503, 504].includes(status ?? 0);
                if (retriable && attempt < retries)
                    return attempt + 1;
                throw error;
            }, 0), delay(retryDelayMs))), map((resp) => (cfg?.returnFullResponse ? resp : resp.data)), catchError((err) => {
                throw this.toHttpException(err);
            }));
            return firstValueFrom(stream);
        }
        /** GET/POST/PUT/PATCH/DELETE minces qui passent par run() */
        get(url, config) {
            return this.run(this.http.get(url, config), config);
        }
        post(url, data, config) {
            return this.run(this.http.post(url, data, config), config);
        }
        put(url, data, config) {
            return this.run(this.http.put(url, data, config), config);
        }
        patch(url, data, config) {
            return this.run(this.http.patch(url, data, config), config);
        }
        delete(url, config) {
            return this.run(this.http.delete(url, config), config);
        }
    };
    __setFunctionName(_classThis, "HttpClientService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpClientService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpClientService = _classThis;
})();
export { HttpClientService };
