import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterUserBodyDto, RegisterUserResponseDto } from './dto/register.dto';
import { LoginUserBodyDto, LoginUserResultDto } from './dto/login.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockAuthService = {
    register: jest.fn(),
    validateUser: jest.fn(),
    login: jest.fn(),
};

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('register', () => {
        it('should register a new user and return the user data', async () => {
            const dto: RegisterUserBodyDto = {
                username: 'testuser',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
            };

            const expectedResponse: RegisterUserResponseDto = {
                userId: '1',
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
            };

            jest.spyOn(authService, 'register').mockResolvedValue(expectedResponse);

            const result = await authController.register(dto);
            expect(result).toEqual(expectedResponse);
            expect(authService.register).toHaveBeenCalledWith(
                dto.username,
                dto.password,
                dto.firstName,
                dto.lastName,
                dto.email,
            );
        });

        it('should throw an HttpException if registration fails', async () => {
            jest.spyOn(authService, 'register').mockRejectedValue(new Error('Registration error'));

            const dto: RegisterUserBodyDto = {
                username: 'failuser',
                password: 'failpass',
                firstName: 'Fail',
                lastName: 'User',
                email: 'fail@example.com',
            };

            await expect(authController.register(dto)).rejects.toThrow(HttpException);
            await expect(authController.register(dto)).rejects.toThrow(
                new HttpException('Registration failed', HttpStatus.BAD_REQUEST),
            );
        });
    });

    describe('login', () => {
        it('should login a user and return an access token', async () => {
            const dto: LoginUserBodyDto = {
                username: 'testuser',
                password: 'password123',
            };

            const mockUser = {
                userId: '1',
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
            };

            const expectedResult: LoginUserResultDto = {
                accessToken: 'mock-jwt-token',
            };

            jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);
            jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);

            const result = await authController.login(dto);
            expect(result).toEqual(expectedResult);
            expect(authService.validateUser).toHaveBeenCalledWith(dto.username, dto.password);
            expect(authService.login).toHaveBeenCalledWith(mockUser);
        });

        it('should throw an HttpException if login fails due to invalid credentials', async () => {
            jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

            const dto: LoginUserBodyDto = {
                username: 'invaliduser',
                password: 'invalidpass',
            };

            await expect(authController.login(dto)).rejects.toThrow(HttpException);
            await expect(authController.login(dto)).rejects.toThrow(
                new HttpException('Login failed', HttpStatus.UNAUTHORIZED),
            );
        });

        it('should throw an HttpException if login fails due to an error', async () => {
            jest.spyOn(authService, 'validateUser').mockRejectedValue(new Error('Login error'));

            const dto: LoginUserBodyDto = {
                username: 'erroruser',
                password: 'errorpass',
            };

            await expect(authController.login(dto)).rejects.toThrow(HttpException);
            await expect(authController.login(dto)).rejects.toThrow(
                new HttpException('Login failed', HttpStatus.UNAUTHORIZED),
            );
        });
    });
});
