import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { AuthResolver } from './auth.resolver';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'your-secret-key',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy, PrismaService],
    controllers: [AuthController],
})
export class AuthModule {}
