import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export function IsPhoneNumberCI(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberCI',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const phoneNumber = parsePhoneNumberFromString(value, 'CI')
          return phoneNumber?.isValid() ?? false
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} doit être un numéro de téléphone valide de Côte d'Ivoire`
        }
      }
    })
  }
}
