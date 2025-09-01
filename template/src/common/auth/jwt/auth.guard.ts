import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { Observable } from 'rxjs';
//   import { jwtConstants } from '../constant/constant';
  import { ConfigService } from '@nestjs/config';
  import { TokenExpiredError } from 'jsonwebtoken';
import { verifyToken } from 'utils/generate';
  
  @Injectable()
  export class JwtGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await verifyToken(token, this.configService);
        request['user'] = payload;
      } catch (e) {
        if (e instanceof TokenExpiredError) {
          throw new UnauthorizedException(
            'Your session has expired. Please log in again.',
          );
        }
        throw new UnauthorizedException('Token invalide');
      }
      return true;
    }
    extractTokenFromHeader(request: Request) {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  