import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { AuthService } from "../auth/token.service";
import { UserService } from "src/auth/user.service";

export function IsEmailExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: EmailExistsValidation,
        });
    };
}


@ValidatorConstraint({ name: 'EmailExists', async: true })
@Injectable()
export class EmailExistsValidation implements ValidatorConstraintInterface {
    constructor(private userService: UserService) { }

    async validate(value: string): Promise<boolean> {
        return this.userService.findUserByEmail(value).then(user => {
            if (user) return false;
            return true;
        })
    }

    defaultMessage(args: ValidationArguments) {
        return `Email already exist`;
    }

}