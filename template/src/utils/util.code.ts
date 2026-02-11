import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): Promise<string> {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

export const comparePasswords = async (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (result) {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Invalid authentication information.',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'An unknown error occurred when comparing passwords.',
    };
  }
};
