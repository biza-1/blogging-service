import { ApiProperty } from '@nestjs/swagger';
import { BlogArticleComment } from '../../blog-article-comment/entities/blog-article-comment.entity';

export class BlogArticleCommentContent {
    articleCommentContentId: string;
    articleCommentId: string;
    text: string;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
    articleComment?: BlogArticleComment;
}
