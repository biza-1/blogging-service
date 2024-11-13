import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserUserDto {
    @IsOptional()
    @IsString()
    username?: string;
    @IsOptional()
    @IsString()
    firstName?: string;
    @IsOptional()
    @IsString()
    lastName?: string;
    @IsOptional()
    passwordSalt?: Buffer;
    @IsOptional()
    passwordHash?: Buffer;
    @IsOptional()
    @IsString()
    email?: string;
    @IsOptional()
    @IsBoolean()
    emailVerified?: boolean;
}
