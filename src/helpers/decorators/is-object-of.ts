import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { TypeHelpOptions, TypeOptions } from 'class-transformer/types/interfaces';
import { IsObject, ValidateNested } from 'class-validator';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';

export function IsObjectOf(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    typeFunction?: (type?: TypeHelpOptions) => Function,
    options?: TypeOptions,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return applyDecorators(
        IsObject(validationOptions),
        ValidateNested(validationOptions),
        Type(typeFunction, options),
    );
}
