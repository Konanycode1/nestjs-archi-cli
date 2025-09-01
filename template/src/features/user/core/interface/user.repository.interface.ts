import { CreateUserDto } from 'features/user/core/dto/create-user.dto';
import { UpdateUserDto } from 'features/user/core/dto/update-user.dto';
import { Role, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

// Creation d'un interface pour la construction du UserRepository

export abstract class InterfaceUserRepository {
  abstract create(dto: CreateUserDto): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findUserExist(email?: string, phone?: string): Promise<User | null>;
  abstract findCountAll(): Promise<number>;
  abstract findRoleExist(name: string): Promise<Role | null>;
  abstract findByPhone(phone: string): Promise<User | null>;
  abstract findAll(limit: number | 10, page: number | 1): Promise<Array<User>>;
  abstract edit(id: string, dto: UpdateUserDto): Promise<User>;
  abstract userDeliveryListe(id: string, query: any ): Promise<any>;
  abstract delete(id: string): Promise<User>;
  abstract statisticDelivery(id: string): Promise<any>;
}
