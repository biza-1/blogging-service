import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { JwtPayload } from './jwt-payload.interface';
import { RegisterUserResponseDto } from './dto/register.dto';
import { LoginUserResultDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        email: string,
    ): Promise<RegisterUserResponseDto> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return this.prisma.userUser.create({
            data: {
                username,
                firstName,
                lastName,
                email,
                emailVerified: false,
                passwordHash: Buffer.from(hashedPassword),
                passwordSalt: Buffer.from(salt),
            },
            select: {
                userId: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
            },
        });
    }

    async validateUser(username: string, password: string): Promise<RegisterUserResponseDto | null> {
        const user = await this.prisma.userUser.findUnique({
            where: { username, active: true },
        });

        if (user && user.passwordHash && user.passwordSalt) {
            const passwordHashString = user.passwordHash.toString('utf-8');
            const saltString = user.passwordSalt.toString('utf-8');

            const hashedInputPassword = await bcrypt.hash(password, saltString);
            if (hashedInputPassword === passwordHashString) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { passwordHash, passwordSalt, ...result } = user;
                return result;
            }
        }

        return null;
    }

    async login(user: RegisterUserResponseDto): Promise<LoginUserResultDto> {
        const payload: JwtPayload = { userId: user.userId };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
