import { IsOptional, IsRFC3339 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogArticleCommentDto {
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    @IsOptional()
    @IsRFC3339()
    deletedAt?: Date;
}
