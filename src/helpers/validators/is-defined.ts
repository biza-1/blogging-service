export const isDefined = <T>(object: T | undefined | null): object is NonNullable<T> =>
    object !== undefined && object !== null;
