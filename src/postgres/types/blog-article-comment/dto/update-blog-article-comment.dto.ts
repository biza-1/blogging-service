import { IsOptional, IsRFC3339 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogArticleCommentDto {
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    @IsOptional()
    @IsRFC3339()
    deletedAt?: Date;
}
