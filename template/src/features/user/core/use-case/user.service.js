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
import { Injectable } from '@nestjs/common';
import { hashPassword } from 'utils/crypt';
import { generateToken, refreshTokenExpired } from 'utils/generate';
// import { AccountRepository } from 'features/account/outBound/account.repository';
let UsersService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UsersService = _classThis = class {
        constructor(userRepository, // Assuming you have a UserRepository to handle database operations
        configService) {
            this.userRepository = userRepository;
            this.configService = configService;
        }
        async create(createUserDto) {
            const { email, phone, password, confirmPassword, ...rest } = createUserDto;
            if (password !== confirmPassword) {
                return { success: false, message: 'Le mot de passe et le mot de passe de confirmation doivent être identiques' };
            }
            if (password.length < 8) {
                return { success: false, message: 'Le mot de passe doit comporter au moins 8 caractères' };
            }
            const [existUser, hash] = await Promise.all([
                this.userRepository.findUserExist(email, phone),
                hashPassword(password),
            ]);
            if (existUser) {
                return { success: false, message: "L'utilisateur existe déjà" };
            }
            if (!hash)
                return { success: false, message: 'Mot de passe non haché' };
            createUserDto.password = hash;
            const createUser = await this.userRepository.create(createUserDto);
            if (!createUser)
                return { success: false, message: 'Compte non créé' };
            const refreshToken = refreshTokenExpired({ id: createUser.id, email: createUser.email }, this.configService);
            const accessToken = generateToken({ id: createUser.id, email: createUser.email }, this.configService);
            return {
                success: true,
                message: 'User created successfully',
                accessToken,
                refreshToken,
            };
        }
        async findAll(limit, page) {
            const [users, total] = await Promise.all([
                this.userRepository.findAll(limit, page),
                this.userRepository.findCountAll(),
            ]);
            return {
                success: true,
                message: 'Users found',
                totalItems: total,
                totalPages: Math.ceil(total / limit),
                page,
                limit,
                data: users
            };
        }
        async findOne(id) {
            const user = await this.userRepository.findById(id);
            if (!user)
                return { success: false, message: 'User not found' };
            return { success: true, message: 'User found', data: user };
        }
        async update(id, updateUserDto) {
            const user = await this.userRepository.edit(id, updateUserDto);
            if (!user)
                return { success: false, message: 'User not updated' };
            return { success: true, message: 'User updated successfully', data: user };
        }
        async remove(id) {
            const user = await this.userRepository.delete(id);
            if (!user)
                return { success: false, message: 'User not deleted' };
            return { success: true, message: 'User deleted successfully' };
        }
        async userDeliveryListe(id, query) {
            const deliveries = await this.userRepository.userDeliveryListe(id, query);
            if (!deliveries)
                return { success: false, message: 'Deliveries not found' };
            return { success: true, message: 'Deliveries found', ...deliveries };
        }
        async statisticDelivery(id) {
            const deliveries = await this.userRepository.statisticDelivery(id);
            if (!deliveries)
                return { success: false, message: 'Deliveries not found' };
            return { success: true, message: 'Deliveries found', ...deliveries };
        }
    };
    __setFunctionName(_classThis, "UsersService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
})();
export { UsersService };
