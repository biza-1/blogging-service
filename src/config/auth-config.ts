import { registerAs } from '@nestjs/config';
import { CONFIG_NAMESPACE } from '../constants/config-namespace';

export interface AuthConfig {
    jwtSecretKet: string;
}

export default registerAs(
    CONFIG_NAMESPACE.AUTH,
    (): AuthConfig => ({
        jwtSecretKet: process.env.JWT_SECRET_KEY as string,
    }),
);
