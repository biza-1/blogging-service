import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogArticleRatingDto {
    @ApiProperty({
        type: `integer`,
        format: `int32`,
    })
    @IsNotEmpty()
    @IsInt()
    rating: number;
    @IsNotEmpty()
    @IsString()
    ipAddress: string;
}
