import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { TypeHelpOptions, TypeOptions } from 'class-transformer/types/interfaces';
import { IsArray, IsObject, ValidateNested } from 'class-validator';
import { ValidationOptions } from 'class-validator/types/decorator/ValidationOptions';

export function IsArrayOf(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    typeFunction?: (type?: TypeHelpOptions) => Function,
    options?: TypeOptions,
    validationOptions?: ValidationOptions,
): PropertyDecorator {
    return applyDecorators(
        IsArray(validationOptions),
        IsObject({ each: true, ...validationOptions }),
        ValidateNested({ each: true, ...validationOptions }),
        Type(typeFunction, options),
    );
}
