import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseConfig } from 'config/db';
import { InterfaceUserRepository } from 'features/user/core/interface/user.repository.interface';
import { UpdateUserDto } from 'features/user/core/dto/update-user.dto';
import { Role, User } from '@prisma/client';
import { CreateUserDto } from 'features/user/core/dto/create-user.dto';
import { IsPhoneNumber } from 'class-validator';
import fa from 'zod/v4/locales/fa.cjs';
import { parse } from 'path';

// Implementation du userRepository
@Injectable()
export class UserRepository implements InterfaceUserRepository, OnModuleInit {
  constructor(private readonly db: DatabaseConfig) {}
 
  async onModuleInit() {
    await this.seedRoles();
    // await this.seedUser();
  }
    // Deplacer le seeder des role vers sa features
    private async seedRoles() {
        const roles = ['SUPERADMIN', 'ADMIN', 'DELIVERY', 'USER', ];
    
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

    
    async create(dto: CreateUserDto): Promise<User> {
        const { fullName, username, address, phone , email, password, role } = dto;

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
    async findById(id: string): Promise<User | null> {
        const user = await this.db.user.findUnique({
            where: {
                id: id,
            },
        });
        return user;
    }
    async findUserExist(email?: string, phone?: string): Promise<any | null> {
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
    async findRoleExist(name: string): Promise<Role | null> {
        const role = await this.db.role.findFirst({
            where: {
                name: name,
            },
        });
        return role;
    }
    async findByPhone(phone: string): Promise<any | null> {
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
    async findCountAll(): Promise<number> {
        const count = await this.db.user.count();
        return count;
    }
    async findAll(limit: number | 10, page: number | 1): Promise<any[]> {
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
    async edit(id: string, dto: UpdateUserDto): Promise<User> {
        const {role, ...rest} = dto;
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
    async delete(id: string): Promise<User> {
        const user = await this.db.user.delete({
            where: {
                id: id,
            },
        });
        return user;
    }
}
