import postgresConfig from './postgres-config';
import websocketConfig from './websocket-config';
import authConfig from './auth-config';

export const configNamespaces = [postgresConfig, websocketConfig, authConfig];

export { PostgresConfig } from './postgres-config';
export { WebsocketConfig } from './websocket-config';
export { AuthConfig } from './auth-config';
