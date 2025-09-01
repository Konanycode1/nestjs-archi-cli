import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import {  generateToken, refreshTokenExpired } from 'utils/generate';
import { comparePasswords } from 'utils/crypt';
import { UserRepository } from 'features/user/outBound/user.repository';
import { promise } from 'zod';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma : PrismaService,
    private configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}
  async create(createAuthDto: CreateAuthDto) {

    const { email, password } = createAuthDto;
     // verifier l'existe du telephone et l'email
     if (!email || !password) {
      return { success: false, message: 'Please fill in all fields' };
    }
    
    const userExist = await this.userRepository.findUserExist(email ,email);
    if (!userExist) {
      return { success: false, message: 'Email or phone number not found.' };
    }
  
    const [verifyPass] = await Promise.all([
      comparePasswords(password, userExist.password),
    ]);

    if (verifyPass.success === false) {
      return { success: false, message: 'Mot de passe incorrect' };
    }
  
    const refreshToken = refreshTokenExpired(
      { id: userExist.id, email: userExist.email },
      this.configService,
    );

    const accessToken = generateToken(
      { id: userExist.id, email: userExist.email },
      this.configService,
    );
    return {
      success: true,
      message: 'valid connection !!!!',
      userId: userExist.id,
      accessToken,
      refreshToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return {
        success: false,
        message: 'User not found.',
      };
    }
    return {
      success: true,
      user
    }

  }
}
