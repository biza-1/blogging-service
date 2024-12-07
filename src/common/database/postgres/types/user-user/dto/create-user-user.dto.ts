import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @IsNotEmpty()
    @IsString()
    lastName: string;
    @IsNotEmpty()
    passwordHash: Buffer;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsBoolean()
    emailVerified: boolean;
}
