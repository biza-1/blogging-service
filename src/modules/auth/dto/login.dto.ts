import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserBodyDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginUserResultDto {
    @IsString()
    accessToken: string;
}
