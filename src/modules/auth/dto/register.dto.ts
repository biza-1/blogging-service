import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { UserUser } from '../../../postgres/types/user-user/entities';

export class RegisterUserBodyDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class RegisterUserResponseDto extends PickType(UserUser, [
    'userId',
    'username',
    'firstName',
    'lastName',
    'email',
]) {}
