// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
import { LowerRoute, Route } from './swagger-types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function getAllChildren(route: Route | LowerRoute): Function[] {
    if (!route.children) {
        return [];
    }

    return route.children
        .map(route => {
            return [route.module, ...getAllChildren(route)];
        })
        .reduce((arr, current) => {
            arr.push(...current);
            return arr;
        }, []);
}
