import { ApiProperty } from '@nestjs/swagger';

export class BlogArticleCommentContentDto {
    articleCommentContentId: string;
    text: string;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
}
