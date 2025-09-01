import { registerDecorator } from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
export function IsPhoneNumberCI(validationOptions) {
    return function (object, propertyName) {
        registerDecorator({
            name: 'isPhoneNumberCI',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    const phoneNumber = parsePhoneNumberFromString(value, 'CI');
                    return phoneNumber?.isValid() ?? false;
                },
                defaultMessage(args) {
                    return `${args.property} doit être un numéro de téléphone valide de Côte d'Ivoire`;
                }
            }
        });
    };
}
