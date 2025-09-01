var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'common/auth/jwt/auth.guard';
let UsersController = (() => {
    let _classDecorators = [Controller({
            version: '1',
            path: 'users',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _userStatistic_decorators;
    let _findAllDelivery_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    var UsersController = _classThis = class {
        constructor(usersService) {
            this.usersService = (__runInitializers(this, _instanceExtraInitializers), usersService);
        }
        async create(createUserDto, res) {
            const userCreated = await this.usersService.create(createUserDto);
            if (userCreated.success === false) {
                return res.status(400).json({ ...userCreated });
            }
            return res.status(200).json({ ...userCreated });
        }
        async findAll(query, res) {
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
            const users = await this.usersService.findAll(limit, page);
            if (users.success === false) {
                return res.status(400).json({ ...users });
            }
            return res.status(200).json({ ...users });
        }
        async userStatistic(res, req) {
            const { id } = req.user;
            const users = await this.usersService.statisticDelivery(id);
            if (users.success === false) {
                return res.status(400).json({ ...users });
            }
            return res.status(200).json({ ...users });
        }
        async findAllDelivery(query, res, req) {
            const { id } = req.user;
            const users = await this.usersService.userDeliveryListe(id, query);
            if (users.success === false) {
                return res.status(400).json({ ...users });
            }
            return res.status(200).json({ ...users });
        }
        async findOne(id, res) {
            const user = await this.usersService.findOne(id);
            if (user.success === false) {
                return res.status(400).json({ ...user });
            }
            return res.status(200).json({ ...user });
        }
        async update(id, updateUserDto, res) {
            const user = await this.usersService.update(id, updateUserDto);
            if (user.success === false) {
                return res.status(400).json({ ...user });
            }
            return res.status(200).json({ ...user });
        }
        async remove(id, res) {
            const user = await this.usersService.remove(id);
            if (user.success === false) {
                return res.status(400).json({ ...user });
            }
            return res.status(200).json({ ...user });
        }
    };
    __setFunctionName(_classThis, "UsersController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [Post('/')];
        _findAll_decorators = [Get('/'), UseGuards(JwtGuard)];
        _userStatistic_decorators = [Get("/statistic/"), UseGuards(JwtGuard)];
        _findAllDelivery_decorators = [Get('/delivery'), UseGuards(JwtGuard)];
        _findOne_decorators = [Get(':id'), UseGuards(JwtGuard)];
        _update_decorators = [Put(':id'), UseGuards(JwtGuard)];
        _remove_decorators = [Delete(':id'), UseGuards(JwtGuard)];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _userStatistic_decorators, { kind: "method", name: "userStatistic", static: false, private: false, access: { has: obj => "userStatistic" in obj, get: obj => obj.userStatistic }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllDelivery_decorators, { kind: "method", name: "findAllDelivery", static: false, private: false, access: { has: obj => "findAllDelivery" in obj, get: obj => obj.findAllDelivery }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersController = _classThis;
})();
export { UsersController };
