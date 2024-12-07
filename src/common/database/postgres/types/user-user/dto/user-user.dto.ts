import { ApiProperty } from '@nestjs/swagger';

export class UserUserDto {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    passwordHash: Buffer;
    email: string;
    emailVerified: boolean;
    active: boolean;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
}
