import { Type } from '@nestjs/common';

export type Routes = Route[];

export interface DocumentationData {
    title: string;
    description: string;
}

export interface Route {
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    module: Function & Type<unknown>;
    children: LowerRoute[];
    documentationData: DocumentationData;
}

export interface LowerRoute {
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    module: Function & Type<unknown>;
    children?: LowerRoute[];
}
