import { ApiProperty } from '@nestjs/swagger';
import { UserUser } from '../../user-user/entities';
import { BlogArticle } from '../../blog-article/entities';
import { BlogArticleCommentContent } from '../../blog-article-comment-content/entities';

export class BlogArticleComment {
    articleCommentId: string;
    userId: string;
    articleId: string;
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
    user?: UserUser;
    article?: BlogArticle;
    content?: BlogArticleCommentContent[];
}
