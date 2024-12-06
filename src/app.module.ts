import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { ConfigModule } from '@nestjs/config';
import { configNamespaces } from './common/config';
import { validateConfig } from './common/config/validation/config.validation';
import { Global, Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';

@Global()
@Module({
    imports: [
        ModulesModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: true,
            introspection: true,
            csrfPrevention: false,
            context: ({ req }) => ({ headers: req.headers }),
        }),
        ConfigModule.forRoot({ isGlobal: true, load: configNamespaces, validate: validateConfig }),
    ],
    providers: [AppResolver],
})
export class AppModule {}
