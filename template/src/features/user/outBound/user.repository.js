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
import { DeliveryStatus } from 'features/delivery/core/dto/create-delivery.dto';
// Implementation du userRepository
let UserRepository = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UserRepository = _classThis = class {
        constructor(db) {
            this.db = db;
        }
        async onModuleInit() {
            await this.seedRoles();
            // await this.seedUser();
        }
        // Deplacer le seeder des role vers sa features
        async seedRoles() {
            const roles = ['SUPERADMIN', 'ADMIN', 'DELIVERY', 'USER',];
            for (const role of roles) {
                const existingRole = await this.db.role.findFirst({
                    where: { name: role },
                });
                if (!existingRole) {
                    await this.db.role.create({
                        data: { name: role },
                    });
                    console.log(`✅ Role "${role}" ajouté.`);
                }
            }
        }
        // private async seedUser() {
        //     const users = [ {firstName:'abraham', lastName:'konany', phoneNumber:'+2250716625753', email:'konanytic2020@gmail.com', password:'12345678', dateOfBirth:'1998-01-01', city:'Abidjan'},]
        //     for (const user of users) {
        //       const existingUser = await this.db.user.findFirst({
        //         where: { email: user.email },
        //       });
        //       let role = await this.db.role.findFirst({
        //         where: { name: 'superAdmin' },
        //         });
        //     if(!role){
        //         role = await this.db.role.create({
        //             data: { name: 'superAdmin' },
        //         });
        //     }
        //       if (!existingUser) {
        //         const newData = {
        //             ...user,
        //             roleId: role.id,
        //         }
        //         const created = await this.db.user.create({
        //           data: { ...newData },
        //         });
        //         // create the SuperAdmin account
        //         await this.db.account.create({
        //             data: {
        //                 userId: created.id,
        //                 accountType: 'main',
        //                 balance: 0,
        //                 isLocked: false
        //             },
        //         });
        //         console.log(`✅ User "${user.firstName}" ajouté.`);
        //       }
        //     }
        //  }
        async create(dto) {
            const { fullName, username, address, phone, email, password, role } = dto;
            const roleExist = await this.db.role.findFirst({
                where: { name: String(role) },
            });
            if (!roleExist) {
                throw new Error('Role not found');
            }
            const user = await this.db.user.create({
                data: {
                    fullName,
                    username,
                    address,
                    email,
                    phone,
                    password,
                    roleId: roleExist.id,
                },
            });
            return user;
        }
        async findById(id) {
            const user = await this.db.user.findUnique({
                where: {
                    id: id,
                },
            });
            return user;
        }
        async findUserExist(email, phone) {
            const user = await this.db.user.findFirst({
                where: {
                    OR: [
                        { phone: phone },
                        { email: email }
                    ],
                },
                select: {
                    // listez tous les champs que vous voulez récupérer à l’exception de `password`
                    id: true,
                    fullName: true,
                    username: true,
                    address: true,
                    dateOfBirth: true,
                    createdAt: true,
                    updatedAt: true,
                    phone: true,
                    email: true,
                    numberPermis: true,
                    numberCarteGrise: true,
                    numberAssurance: true,
                    numberAssuranceDate: true,
                    numberCarteGriseDate: true,
                    numberPermisDate: true,
                    numberMatricule: true,
                    numberMatriculeDate: true,
                    password: true,
                    role: {
                        select: {
                            id: true,
                            name: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    }
                }
            });
            return user;
        }
        async findRoleExist(name) {
            const role = await this.db.role.findFirst({
                where: {
                    name: name,
                },
            });
            return role;
        }
        async findByPhone(phone) {
            const user = await this.db.user.findFirst({
                where: {
                    phone: phone,
                },
                select: {
                    // listez tous les champs que vous voulez récupérer à l’exception de `password`
                    id: true,
                    fullName: true,
                    username: true,
                    address: true,
                    dateOfBirth: true,
                    createdAt: true,
                    updatedAt: true,
                    phone: true,
                    email: true,
                    numberPermis: true,
                    numberCarteGrise: true,
                    numberAssurance: true,
                    numberAssuranceDate: true,
                    numberCarteGriseDate: true,
                    numberPermisDate: true,
                    numberMatricule: true,
                    numberMatriculeDate: true,
                    password: false,
                    role: {
                        select: {
                            id: true,
                            name: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    }
                }
            });
            return user;
        }
        async findCountAll() {
            const count = await this.db.user.count();
            return count;
        }
        async findAll(limit, page) {
            const skip = (page - 1) * limit;
            const users = await this.db.user.findMany({
                select: {
                    // listez tous les champs que vous voulez récupérer à l’exception de `password`
                    id: true,
                    fullName: true,
                    username: true,
                    address: true,
                    dateOfBirth: true,
                    createdAt: true,
                    updatedAt: true,
                    phone: true,
                    email: true,
                    numberPermis: true,
                    numberCarteGrise: true,
                    numberAssurance: true,
                    numberAssuranceDate: true,
                    numberCarteGriseDate: true,
                    numberPermisDate: true,
                    numberMatricule: true,
                    numberMatriculeDate: true,
                    password: false,
                    role: {
                        select: {
                            id: true,
                            name: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    }
                },
                skip: skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return users;
        }
        async edit(id, dto) {
            const { role, ...rest } = dto;
            const roleExist = await this.db.role.findFirst({
                where: { name: String(role) },
            });
            if (!roleExist) {
                throw new Error('Role not found');
            }
            const user = await this.db.user.update({
                where: {
                    id: id,
                },
                data: {
                    ...rest,
                    dateOfBirth: rest.dateOfBirth ? rest.dateOfBirth.toString() : undefined,
                    roleId: roleExist.id,
                },
            });
            return user;
        }
        async delete(id) {
            const user = await this.db.user.delete({
                where: {
                    id: id,
                },
            });
            return user;
        }
        async userDeliveryListe(id, query) {
            const limit = parseInt(query.limit) || 10;
            const page = parseInt(query.page) || 1;
            const skip = (page - 1) * limit;
            const status = query.status;
            const where = {
                assignedDriverId: id,
            };
            if (status) {
                where.status = status;
            }
            const [deliveries, totalDeliveries] = await Promise.all([
                await this.db.delivery.findMany({
                    where,
                    skip: skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        pickupAddress: true,
                        deliveryAddress: true
                    },
                }),
                await this.db.delivery.count({ where }),
            ]);
            return {
                data: deliveries,
                totalItems: totalDeliveries,
                totalPages: Math.ceil(totalDeliveries / limit),
                page,
                limit
            };
        }
        async statisticDelivery(id) {
            const assignedCount = await this.db.delivery.count({
                where: {
                    assignedDriverId: id,
                    status: {
                        in: [
                            DeliveryStatus.ASSIGNED,
                            DeliveryStatus.IN_TRANSIT,
                            DeliveryStatus.PICKED_UP,
                        ],
                    },
                },
            });
            const deliveredCount = await this.db.delivery.count({
                where: {
                    assignedDriverId: id,
                    status: DeliveryStatus.DELIVERED,
                },
            });
            const pendingCount = await this.db.delivery.count({
                where: {
                    status: DeliveryStatus.PENDING,
                },
            });
            return {
                deliveryInProgress: assignedCount,
                deliveryFinished: deliveredCount,
                deliveryAvailable: pendingCount
            };
        }
    };
    __setFunctionName(_classThis, "UserRepository");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserRepository = _classThis;
})();
export { UserRepository };
