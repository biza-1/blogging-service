import { plainToClass } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export class Environment {
    // Postgres
    @IsString()
    DATABASE_URL: string;

    // Auth
    @IsString()
    JWT_SECRET_KEY: string;
}

class ValidationError extends Error {}

export function validateConfig(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(Environment, config, { enableImplicitConversion: true });

    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new ValidationError(errors.toString());
    }

    return validatedConfig;
}
