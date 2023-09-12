import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { AuthService } from "../auth/token.service";
import { UserService } from "src/auth/user.service";

export function IsUsernameExists(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UsernameExistsValidation,
        });
    };
}


@ValidatorConstraint({ name: 'UsernameExists', async: true })
@Injectable()
export class UsernameExistsValidation implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) { }

    async validate(value: string): Promise<boolean> {
        return this.userService.findUserByUsername(value).then(user => {
            if (user) return false;
            return true;
        })
    }

    defaultMessage(args: ValidationArguments) {
        return `Username already exist`;
    }

}