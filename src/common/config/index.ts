import postgresConfig from './postgres.config';
import authConfig from './auth.config';

export const configNamespaces = [postgresConfig, authConfig];

export { PostgresConfig } from './postgres.config';
export { AuthConfig } from './auth.config';
