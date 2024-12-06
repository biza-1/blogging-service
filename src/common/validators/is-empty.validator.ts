import { isDefined } from './is-defined.validator';

export const isEmpty = <T>(value: T | undefined | null | ''): value is undefined | null | '' =>
    !isDefined(value) || value === '';
