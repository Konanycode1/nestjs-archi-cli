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
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'features/user/core/dto/create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumberCI } from 'utils/validators/phoneNumber.validate';
let UpdateUserDto = (() => {
    var _a;
    let _classSuper = PartialType(CreateUserDto);
    let _fullName_decorators;
    let _fullName_initializers = [];
    let _fullName_extraInitializers = [];
    let _username_decorators;
    let _username_initializers = [];
    let _username_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _address_extraInitializers = [];
    let _phone_decorators;
    let _phone_initializers = [];
    let _phone_extraInitializers = [];
    let _dateOfBirth_decorators;
    let _dateOfBirth_initializers = [];
    let _dateOfBirth_extraInitializers = [];
    let _numberPermis_decorators;
    let _numberPermis_initializers = [];
    let _numberPermis_extraInitializers = [];
    let _numberCarteGrise_decorators;
    let _numberCarteGrise_initializers = [];
    let _numberCarteGrise_extraInitializers = [];
    let _numberAssurance_decorators;
    let _numberAssurance_initializers = [];
    let _numberAssurance_extraInitializers = [];
    let _numberMatricule_decorators;
    let _numberMatricule_initializers = [];
    let _numberMatricule_extraInitializers = [];
    let _numberPermisDate_decorators;
    let _numberPermisDate_initializers = [];
    let _numberPermisDate_extraInitializers = [];
    let _numberAssuranceDate_decorators;
    let _numberAssuranceDate_initializers = [];
    let _numberAssuranceDate_extraInitializers = [];
    let _numberMatriculeDate_decorators;
    let _numberMatriculeDate_initializers = [];
    let _numberMatriculeDate_extraInitializers = [];
    let _numberCarteGriseDate_decorators;
    let _numberCarteGriseDate_initializers = [];
    let _numberCarteGriseDate_extraInitializers = [];
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    return _a = class UpdateUserDto extends _classSuper {
            constructor() {
                super(...arguments);
                this.fullName = __runInitializers(this, _fullName_initializers, void 0);
                this.username = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _username_initializers, void 0));
                this.email = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.address = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.phone = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.dateOfBirth = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _dateOfBirth_initializers, void 0));
                this.numberPermis = (__runInitializers(this, _dateOfBirth_extraInitializers), __runInitializers(this, _numberPermis_initializers, void 0));
                this.numberCarteGrise = (__runInitializers(this, _numberPermis_extraInitializers), __runInitializers(this, _numberCarteGrise_initializers, void 0));
                this.numberAssurance = (__runInitializers(this, _numberCarteGrise_extraInitializers), __runInitializers(this, _numberAssurance_initializers, void 0));
                this.numberMatricule = (__runInitializers(this, _numberAssurance_extraInitializers), __runInitializers(this, _numberMatricule_initializers, void 0));
                this.numberPermisDate = (__runInitializers(this, _numberMatricule_extraInitializers), __runInitializers(this, _numberPermisDate_initializers, void 0));
                this.numberAssuranceDate = (__runInitializers(this, _numberPermisDate_extraInitializers), __runInitializers(this, _numberAssuranceDate_initializers, void 0));
                this.numberMatriculeDate = (__runInitializers(this, _numberAssuranceDate_extraInitializers), __runInitializers(this, _numberMatriculeDate_initializers, void 0));
                this.numberCarteGriseDate = (__runInitializers(this, _numberMatriculeDate_extraInitializers), __runInitializers(this, _numberCarteGriseDate_initializers, void 0));
                this.role = (__runInitializers(this, _numberCarteGriseDate_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                __runInitializers(this, _role_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _fullName_decorators = [IsOptional(), IsString()];
            _username_decorators = [IsString()];
            _email_decorators = [IsOptional(), IsEmail()];
            _address_decorators = [IsOptional(), IsString()];
            _phone_decorators = [IsOptional(), IsPhoneNumberCI({ message: 'Numéro invalide pour la CI' })];
            _dateOfBirth_decorators = [IsOptional(), IsString()];
            _numberPermis_decorators = [IsString(), IsOptional()];
            _numberCarteGrise_decorators = [IsString(), IsOptional()];
            _numberAssurance_decorators = [IsString(), IsOptional()];
            _numberMatricule_decorators = [IsString(), IsOptional()];
            _numberPermisDate_decorators = [IsString(), IsOptional()];
            _numberAssuranceDate_decorators = [IsString(), IsOptional()];
            _numberMatriculeDate_decorators = [IsString(), IsOptional()];
            _numberCarteGriseDate_decorators = [IsString(), IsOptional()];
            _role_decorators = [IsString(), IsOptional()];
            __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: obj => "fullName" in obj, get: obj => obj.fullName, set: (obj, value) => { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
            __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: obj => "username" in obj, get: obj => obj.username, set: (obj, value) => { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: obj => "phone" in obj, get: obj => obj.phone, set: (obj, value) => { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _dateOfBirth_decorators, { kind: "field", name: "dateOfBirth", static: false, private: false, access: { has: obj => "dateOfBirth" in obj, get: obj => obj.dateOfBirth, set: (obj, value) => { obj.dateOfBirth = value; } }, metadata: _metadata }, _dateOfBirth_initializers, _dateOfBirth_extraInitializers);
            __esDecorate(null, null, _numberPermis_decorators, { kind: "field", name: "numberPermis", static: false, private: false, access: { has: obj => "numberPermis" in obj, get: obj => obj.numberPermis, set: (obj, value) => { obj.numberPermis = value; } }, metadata: _metadata }, _numberPermis_initializers, _numberPermis_extraInitializers);
            __esDecorate(null, null, _numberCarteGrise_decorators, { kind: "field", name: "numberCarteGrise", static: false, private: false, access: { has: obj => "numberCarteGrise" in obj, get: obj => obj.numberCarteGrise, set: (obj, value) => { obj.numberCarteGrise = value; } }, metadata: _metadata }, _numberCarteGrise_initializers, _numberCarteGrise_extraInitializers);
            __esDecorate(null, null, _numberAssurance_decorators, { kind: "field", name: "numberAssurance", static: false, private: false, access: { has: obj => "numberAssurance" in obj, get: obj => obj.numberAssurance, set: (obj, value) => { obj.numberAssurance = value; } }, metadata: _metadata }, _numberAssurance_initializers, _numberAssurance_extraInitializers);
            __esDecorate(null, null, _numberMatricule_decorators, { kind: "field", name: "numberMatricule", static: false, private: false, access: { has: obj => "numberMatricule" in obj, get: obj => obj.numberMatricule, set: (obj, value) => { obj.numberMatricule = value; } }, metadata: _metadata }, _numberMatricule_initializers, _numberMatricule_extraInitializers);
            __esDecorate(null, null, _numberPermisDate_decorators, { kind: "field", name: "numberPermisDate", static: false, private: false, access: { has: obj => "numberPermisDate" in obj, get: obj => obj.numberPermisDate, set: (obj, value) => { obj.numberPermisDate = value; } }, metadata: _metadata }, _numberPermisDate_initializers, _numberPermisDate_extraInitializers);
            __esDecorate(null, null, _numberAssuranceDate_decorators, { kind: "field", name: "numberAssuranceDate", static: false, private: false, access: { has: obj => "numberAssuranceDate" in obj, get: obj => obj.numberAssuranceDate, set: (obj, value) => { obj.numberAssuranceDate = value; } }, metadata: _metadata }, _numberAssuranceDate_initializers, _numberAssuranceDate_extraInitializers);
            __esDecorate(null, null, _numberMatriculeDate_decorators, { kind: "field", name: "numberMatriculeDate", static: false, private: false, access: { has: obj => "numberMatriculeDate" in obj, get: obj => obj.numberMatriculeDate, set: (obj, value) => { obj.numberMatriculeDate = value; } }, metadata: _metadata }, _numberMatriculeDate_initializers, _numberMatriculeDate_extraInitializers);
            __esDecorate(null, null, _numberCarteGriseDate_decorators, { kind: "field", name: "numberCarteGriseDate", static: false, private: false, access: { has: obj => "numberCarteGriseDate" in obj, get: obj => obj.numberCarteGriseDate, set: (obj, value) => { obj.numberCarteGriseDate = value; } }, metadata: _metadata }, _numberCarteGriseDate_initializers, _numberCarteGriseDate_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { UpdateUserDto };
