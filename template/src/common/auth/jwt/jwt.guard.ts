import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard personnalisé qui utilise la stratégie 'jwt'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
