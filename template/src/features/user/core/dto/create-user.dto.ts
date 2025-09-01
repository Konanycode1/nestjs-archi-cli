import { IsDateString, IsEmail, IsString } from "class-validator";
import { IsPhoneNumberCI } from "utils/validators/phoneNumber.validate";

export class CreateUserDto {

    @IsString()
    fullName: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    address: string;

    @IsPhoneNumberCI({ message: 'Numéro invalide pour la CI' })
    phone: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;
    @IsString()
    role: string;
}
