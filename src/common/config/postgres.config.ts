import { registerAs } from '@nestjs/config';
import { CONFIG_NAMESPACE } from '../constants';

export interface PostgresConfig {
    databaseUrl: string;
}

export default registerAs(
    CONFIG_NAMESPACE.POSTGRES,
    (): PostgresConfig => ({
        databaseUrl: process.env.DATABASE_URL as string,
    }),
);
