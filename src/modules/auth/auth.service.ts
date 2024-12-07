import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/providers';
import { JwtPayload } from './jwt-payload.interface';
import { RegisterUserResponseDto } from './dto/register.dto';
import { LoginUserResultDto } from './dto/login.dto';
import { ENCODING } from '../../common/constants';
import { HASH_SALT_LENGTH } from '../../common/auth/constants';

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
        const hashedPassword = await bcrypt.hash(password, HASH_SALT_LENGTH);

        return this.prisma.userUser.create({
            data: {
                username,
                firstName,
                lastName,
                email,
                emailVerified: false,
                passwordHash: Buffer.from(hashedPassword),
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

        if (user && (await bcrypt.compare(password, user.passwordHash.toString(ENCODING.UTF8)))) {
            const { passwordHash, ...result } = user;
            return result;
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
