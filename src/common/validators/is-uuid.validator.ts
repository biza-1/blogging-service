import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { isDefined } from './is-defined.validator';

export function isUuid(value: string | null | undefined, version: 4 | 1 = 4): boolean {
    if (!isDefined(value)) {
        return false;
    }

    return uuidValidate(value) && uuidVersion(value) === version;
}
