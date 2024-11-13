import { Type } from '@nestjs/common';
import { MODULE_PATH } from '@nestjs/common/constants';
import Module from 'module';
import { ModulesModule } from './modules/modules.module';
import { isDefined } from './helpers/validators/is-defined';
import { isEmpty } from './helpers/validators/is-empty';
import { Routes } from './helpers/swagger/swagger-types';

const pathJoin = (path1: string, path2: string): string => {
    if (isEmpty(path2)) {
        return path1;
    }
    return `${path1}/${path2}`.replace('//', '/');
};

type GetChildren = {
    path: string;
    module: typeof Module;
    children: GetChildren[];
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const getChildren = (module: Function & Type<unknown>, pathPrefix = ''): GetChildren[] => {
    const modulePath: string = pathPrefix;
    Reflect.defineMetadata(MODULE_PATH, modulePath, module);
    const children: {
        path: string;
        module: typeof Module;
    }[] = Reflect.getMetadata('moduleChildren', module) ?? [];

    if (!isDefined(children)) {
        return [];
    }
    return children.map(({ path, module }) => ({
        path,
        module,
        children: getChildren(module, pathJoin(modulePath, path)),
    }));
};

export const routes: Routes = [
    {
        path: '',
        module: ModulesModule,
    },
].map(({ path, module }) => ({
    path,
    module,
    children: getChildren(module, path),
    documentationData: Reflect.getMetadata('moduleDocumentationMetadata', module) ?? {
        title: '',
        description: '',
    },
}));
