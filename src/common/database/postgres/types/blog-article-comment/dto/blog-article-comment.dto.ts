import { ApiProperty } from '@nestjs/swagger';

export class BlogArticleCommentDto {
    articleCommentId: string;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    deletedAt: Date | null;
}
