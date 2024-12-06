import { Module as NestModule, ModuleMetadata, Type } from '@nestjs/common';

interface DocumentationData {
    title: string;
    description: string;
}

interface Child {
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    module: Function & Type<unknown>;
}

interface ModuleParameters {
    metadata: ModuleMetadata;
    documentationData?: DocumentationData;
    children?: Child[];
}

export function Module(params: ModuleParameters): ClassDecorator {
    return (target: never) => {
        Reflect.defineMetadata(
            'moduleDocumentationMetadata',
            params.documentationData ?? { title: '', description: '' },
            target,
        );
        Reflect.defineMetadata('moduleChildren', params.children ?? [], target);

        return NestModule(params.metadata)(target);
    };
}
