import {
    HttpException,
    HttpStatus,
    Injectable,
    ValidationError,
    ValidationPipeOptions,
  } from '@nestjs/common';
  import { PrismaService } from 'nestjs-prisma';
//   import * as bcrypt from 'bcrypt';
  
  function generateErrors(errors: ValidationError[]) {
    return errors.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.property]:
          (currentValue.children?.length ?? 0) > 0
            ? generateErrors(currentValue.children ?? [])
            : Object.values(currentValue.constraints ?? {}).join(', '),
      }),
      {},
    );
  }
  
  export const validationOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    enableDebugMessages: true,
    disableErrorMessages: false,
    forbidNonWhitelisted: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    exceptionFactory: (errors: ValidationError[]) => {
      return new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: generateErrors(errors),
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    },
  };
  
  // export default validationOptions;
  
  
  @Injectable()
  export class SuperAdminSeederService {
    
    constructor(private readonly prisma: PrismaService) {}
  
    async seedRoler() {
      console.log('Seeding roles...');
      const existingUser = await this.prisma.role.findFirst({
        where: { name: 'USER' },
      });
      const existDelivery = await this.prisma.role.findFirst({
        where: { name: 'CLIENT' },
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
              name: 'CLIENT',
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
  }