import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsString, ValidationOptions } from 'class-validator';
import { trim } from 'lodash';
import { isDefined } from '../validators/is-defined';

export function TrimString(validationOptions?: ValidationOptions): PropertyDecorator {
    return applyDecorators(
        IsString(validationOptions),
        Transform(({ value }) => {
            if (!isDefined(value)) {
                return undefined;
            }
            const trimmed = trim(value);
            return trimmed.length > 0 ? trimmed : undefined;
        }),
    );
}
