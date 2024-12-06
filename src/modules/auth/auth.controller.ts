import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserBodyDto, RegisterUserResponseDto } from './dto/register.dto';
import { LoginUserBodyDto, LoginUserResultDto } from './dto/login.dto';
import { LOG_CONTEXT } from '../../common/constants';

@Controller('/')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register new user' })
    async register(@Body() body: RegisterUserBodyDto): Promise<RegisterUserResponseDto> {
        try {
            return await this.authService.register(
                body.username,
                body.password,
                body.firstName,
                body.lastName,
                body.email,
            );
        } catch (error) {
            console.log(LOG_CONTEXT.AUTH_CONTROLLER, error);

            throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'Login existing user' })
    async login(@Body() body: LoginUserBodyDto): Promise<LoginUserResultDto> {
        try {
            const user = await this.authService.validateUser(body.username, body.password);
            if (!user) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }

            return await this.authService.login(user);
        } catch (error) {
            console.log(LOG_CONTEXT.AUTH_CONTROLLER, error);

            throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
        }
    }
}
