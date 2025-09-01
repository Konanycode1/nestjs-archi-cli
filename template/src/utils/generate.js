import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto-js';
import { jwtConstants } from 'common/auth/jwt/constant';
// Initialisation du service JWT
const jwtService = new JwtService();
// Fonction pour générer un token JWT
export const generateToken = (payload, configService) => {
    // console.log(payload);
    const jwtTime = configService.get('JWT_EXPIRATION_TIME') || '15m';
    // console.log(jwtTime);
    return jwtService.sign({ ...payload }, { secret: jwtConstants.secret, expiresIn: jwtTime });
};
export const refreshTokenExpired = (payload, configService) => {
    const secret = configService.get('JWT_SECRET');
    const jwtTime = '7d';
    return jwtService.sign({ ...payload }, { secret: jwtConstants.secret, expiresIn: jwtTime });
};
// Fonction pour vérifier un token JWT
export const verifyToken = (token, configService) => {
    try {
        const decoded = jwtService.verify(token, { secret: jwtConstants.secret });
        return decoded;
    }
    catch {
        throw new Error('Invalid token');
    }
};
export const genererCode = async () => {
    return Math.floor(100000 + Math.random() * 900000); // Génère un nombre aléatoire entre 1000 et 9999
};
// Encrypt function with expiration
export const encrypt = (payload, configService, expiresInSeconds) => {
    const secret = configService.get('JWT_SECRET');
    const expirationTime = Date.now() + expiresInSeconds * 1000;
    const payloadWithExpiration = { data: payload, expiration: expirationTime };
    const payloadString = JSON.stringify(payloadWithExpiration);
    const ciphertext = crypto.AES.encrypt(payloadString, secret).toString();
    return ciphertext;
};
// Decrypt function
export const decrypt = (ciphertext, configService) => {
    const secret = configService.get('JWT_SECRET');
    console.log(ciphertext);
    console.log('secret: ', secret);
    const bytes = crypto.AES.decrypt(ciphertext, secret);
    const decryptedText = bytes.toString(crypto.enc.Utf8);
    if (!decryptedText) {
        throw new Error('Decryption failed');
    }
    const payloadWithExpiration = JSON.parse(decryptedText);
    // Check if the data is expired
    if (Date.now() > payloadWithExpiration.expiration) {
        throw new Error('Data has expired');
    }
    return payloadWithExpiration.data;
};
//verify number phone
