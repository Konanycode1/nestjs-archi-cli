import { Injectable } from '@nestjs/common';
import { UserRepository } from 'features/user/outBound/user.repository';
import { CreateUserDto } from 'features/user/core/dto/create-user.dto';
import { UpdateUserDto } from 'features/user/core/dto/update-user.dto';
import { hashPassword } from 'utils/crypt';
import { generateToken, refreshTokenExpired } from 'utils/generate';
import { ConfigService } from '@nestjs/config';
// import { AccountRepository } from 'features/account/outBound/account.repository';

@Injectable()
export class UsersService  {

  constructor(
    private readonly userRepository: UserRepository, // Assuming you have a UserRepository to handle database operations
    private readonly configService: ConfigService, // Assuming you have a ConfigService for configuration
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email,phone, password,confirmPassword, ...rest } = createUserDto;
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
    if(!hash) return { success: false, message: 'Mot de passe non haché' };
    createUserDto.password = hash;

    const createUser = await this.userRepository.create(createUserDto);
    if(!createUser) return { success: false, message: 'Compte non créé' };

    const refreshToken = refreshTokenExpired(
          { id: createUser.id, email: createUser.email },
          this.configService,
        );
    const accessToken = generateToken(
          { id: createUser.id, email: createUser.email },
          this.configService,
        );
    return { 
      success: true,
      message: 'User created successfully',
      accessToken,
      refreshToken,
      };


  }

  async findAll(limit: number | 10, page: number | 1) {
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
      data:users
    };
  }
  
  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if(!user) return { success: false, message: 'User not found' };
    return { success: true, message: 'User found', data:user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.edit(id, updateUserDto);
    if(!user) return { success: false, message: 'User not updated' };
    return { success: true, message: 'User updated successfully', data:user };
  }

  async remove(id: string) {
    const user = await this.userRepository.delete(id);
    if(!user) return { success: false, message: 'User not deleted' };
    return { success: true, message: 'User deleted successfully' };
  }
}
