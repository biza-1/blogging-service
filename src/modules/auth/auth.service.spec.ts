import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../common/providers';
import { JwtService } from '@nestjs/jwt';

jest.mock('bcryptjs', () => ({
    genSalt: jest.fn(() => 'mockSalt'),
    hash: jest.fn((password, salt) => `hashed_${password}_${salt}`),
}));

describe('AuthService', () => {
    let authService: AuthService;
    let prismaService: PrismaService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: {
                        userUser: {
                            create: jest.fn(),
                            findUnique: jest.fn(),
                        },
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mock-jwt-token'),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        prismaService = module.get<PrismaService>(PrismaService);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('register', () => {
        it('should create a new user and return user data', async () => {
            const mockUser = {
                userId: '1',
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
            };

            (prismaService.userUser.create as jest.Mock).mockResolvedValue(mockUser);

            const result = await authService.register(
                'testuser',
                'password123',
                'Test',
                'User',
                'test@example.com',
            );

            expect(result).toEqual(mockUser);
            expect(prismaService.userUser.create).toHaveBeenCalledWith({
                data: {
                    username: 'testuser',
                    firstName: 'Test',
                    lastName: 'User',
                    email: 'test@example.com',
                    emailVerified: false,
                    passwordHash: Buffer.from('hashed_password123_mockSalt'),
                    passwordSalt: Buffer.from('mockSalt'),
                },
                select: {
                    userId: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            });
        });
    });

    describe('validateUser', () => {
        it('should return user data if credentials are valid', async () => {
            const mockUser = {
                userId: '1',
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                passwordHash: Buffer.from('hashed_password123_mockSalt'),
                passwordSalt: Buffer.from('mockSalt'),
            };

            (prismaService.userUser.findUnique as jest.Mock).mockResolvedValue(mockUser);

            const result = await authService.validateUser('testuser', 'password123');
            expect(result).toEqual({
                userId: '1',
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
            });
            expect(prismaService.userUser.findUnique).toHaveBeenCalledWith({
                where: { username: 'testuser', active: true },
            });
        });

        it('should return null if credentials are invalid', async () => {
            (prismaService.userUser.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await authService.validateUser('invaliduser', 'wrongpass');
            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should return an access token for a valid user', async () => {
            const mockUser = {
                userId: '1',
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
            };

            const result = await authService.login(mockUser);
            expect(result).toEqual({ accessToken: 'mock-jwt-token' });
            expect(jwtService.sign).toHaveBeenCalledWith({ userId: '1' });
        });
    });
});
