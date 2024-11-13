import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogArticleRatingDto {
    @ApiProperty({
        type: `integer`,
        format: `int32`,
    })
    @IsOptional()
    @IsInt()
    rating?: number;
    @IsOptional()
    @IsString()
    ipAddress?: string;
}
