import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto-js';
import { jwtConstants } from 'common/auth/jwt/constant';
// Initialisation du service JWT
const jwtService = new JwtService();

// Fonction pour générer un token JWT
export const generateToken = (
  payload: object,
  configService: ConfigService,
): string => {
  // console.log(payload);
  const jwtTime = configService.get('JWT_EXPIRATION_TIME') || '15m';
  // console.log(jwtTime);
  return jwtService.sign({ ...payload }, { secret:jwtConstants.secret, expiresIn: jwtTime });
};

export const refreshTokenExpired = (
  payload: object,
  configService: ConfigService,
): string => {
  const secret = configService.get('JWT_SECRET');
  const jwtTime = '7d';
  return jwtService.sign({ ...payload }, { secret:jwtConstants.secret, expiresIn: jwtTime });
};

// Fonction pour vérifier un token JWT
export const verifyToken = (
  token: string,
  configService: ConfigService,
): string | object => {
  try {
    const decoded =  jwtService.verify(token, { secret: jwtConstants.secret });
    return decoded;
  } catch {
    throw new Error('Invalid token');
  }
};

export const genererCode = async (): Promise<number> => {
  return Math.floor(100000 + Math.random() * 900000); // Génère un nombre aléatoire entre 1000 et 9999
};


// export const encrypt = (payload: string,configService: ConfigService) => {
//   const secret = configService.get<string>('JWT_SECRET');
//   const ciphertext = crypto.AES.encrypt(payload, secret).toString();
//   return ciphertext;
// };
interface EncryptedPayload {
  data: any;
  expiration: number;
}

// Encrypt function with expiration
export const encrypt = (payload: any, configService: ConfigService, expiresInSeconds: number) => {
  const secret = configService.get<string>('JWT_SECRET');
  const expirationTime = Date.now() + expiresInSeconds * 1000;
  const payloadWithExpiration: EncryptedPayload = { data: payload, expiration: expirationTime };
  const payloadString = JSON.stringify(payloadWithExpiration);
  
  const ciphertext = crypto.AES.encrypt(payloadString, secret).toString();
  return ciphertext;
};

// Decrypt function

export const decrypt = (ciphertext: string, configService: ConfigService) => {
  const secret = configService.get<string>('JWT_SECRET');
  console.log(ciphertext);
  console.log('secret: ',secret);
  const bytes = crypto.AES.decrypt(ciphertext, secret);
  const decryptedText = bytes.toString(crypto.enc.Utf8);

  if (!decryptedText) {
    throw new Error('Decryption failed');
  }
  const payloadWithExpiration: EncryptedPayload = JSON.parse(decryptedText);

  // Check if the data is expired
  if (Date.now() > payloadWithExpiration.expiration) {
    throw new Error('Data has expired');
  }

  return payloadWithExpiration.data;
};


//verify number phone