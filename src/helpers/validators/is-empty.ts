import { isDefined } from './is-defined';

export const isEmpty = <T>(value: T | undefined | null | ''): value is undefined | null | '' =>
    !isDefined(value) || value === '';
