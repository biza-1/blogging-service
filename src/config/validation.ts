import { plainToClass } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export class Environment {
    // Postgres
    @IsString()
    DATABASE_URL: string;

    // Websocket
    @IsString()
    RATING_EVENT_NAME: string;

    @IsString()
    COMMENTS_EVENT_NAME: string;

    // Auth
    @IsString()
    JWT_SECRET_KEY: string;
}

class ValidationError extends Error {}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(Environment, config, { enableImplicitConversion: true });

    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new ValidationError(errors.toString());
    }

    return validatedConfig;
}
