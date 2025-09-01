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
import { HttpException, HttpStatus, Injectable, } from '@nestjs/common';
//   import * as bcrypt from 'bcrypt';
function generateErrors(errors) {
    return errors.reduce((accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.property]: (currentValue.children?.length ?? 0) > 0
            ? generateErrors(currentValue.children ?? [])
            : Object.values(currentValue.constraints ?? {}).join(', '),
    }), {});
}
export const validationOptions = {
    transform: true,
    whitelist: true,
    enableDebugMessages: true,
    disableErrorMessages: false,
    forbidNonWhitelisted: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    exceptionFactory: (errors) => {
        return new HttpException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: generateErrors(errors),
        }, HttpStatus.UNPROCESSABLE_ENTITY);
    },
};
// export default validationOptions;
let SuperAdminSeederService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SuperAdminSeederService = _classThis = class {
        constructor(prisma) {
            this.prisma = prisma;
        }
        async seedRoler() {
            console.log('Seeding roles...');
            const existingUser = await this.prisma.role.findFirst({
                where: { name: 'USER' },
            });
            const existDelivery = await this.prisma.role.findFirst({
                where: { name: 'DELIVERY' },
            });
            const existAdmin = await this.prisma.role.findFirst({
                where: { name: 'ADMIN' },
            });
            const existSuperAdmin = await this.prisma.role.findFirst({
                where: { name: 'SUPERADMIN' },
            });
            await Promise.all([
                !existAdmin &&
                    this.prisma.role.create({
                        data: {
                            name: 'ADMIN',
                        },
                    }),
                !existingUser &&
                    this.prisma.role.create({
                        data: {
                            name: 'USER',
                        },
                    }),
                !existDelivery &&
                    this.prisma.role.create({
                        data: {
                            name: 'DELIVERY',
                        },
                    }),
                !existSuperAdmin &&
                    this.prisma.role.create({
                        data: {
                            name: 'SUPERADMIN',
                        },
                    }),
            ]);
            console.log('Roles seeded.');
        }
    };
    __setFunctionName(_classThis, "SuperAdminSeederService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SuperAdminSeederService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SuperAdminSeederService = _classThis;
})();
export { SuperAdminSeederService };
