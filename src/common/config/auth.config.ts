import { registerAs } from '@nestjs/config';
import { CONFIG_NAMESPACE } from '../constants';

export interface AuthConfig {
    jwtSecretKey: string;
}

export default registerAs(
    CONFIG_NAMESPACE.AUTH,
    (): AuthConfig => ({
        jwtSecretKey: process.env.JWT_SECRET_KEY as string,
    }),
);
