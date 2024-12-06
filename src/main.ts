import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { getAllChildren } from './common/swagger/helpers/get-all-children';
import { routes } from './routes';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger setup
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    // get children for better route path setting
    const children = getAllChildren(routes[0]);

    const document = SwaggerModule.createDocument(app, config, { include: [routes[0].module, ...children] });

    SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
            tryItOutEnabled: true,
            persistAuthorization: true,
        },
    });

    // Log the Swagger UI and GraphQL endpoints
    const serverUrl = 'http://localhost:3000';
    const swaggerUrl = `${serverUrl}/api-docs`;
    const graphqlUrl = `${serverUrl}/graphql`;

    Logger.log(`Swagger UI available at: ${swaggerUrl}`);
    Logger.log(`GraphQL API available at: ${graphqlUrl}`);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: false,
            transformOptions: {
                enableImplicitConversion: true,
            },
            exceptionFactory(errors: ValidationError[]) {
                return new BadRequestException({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors: errors.map(err => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            },
        }),
    );

    await app.listen(3000);
}

bootstrap();
