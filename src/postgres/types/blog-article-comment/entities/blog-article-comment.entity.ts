import { ApiProperty } from '@nestjs/swagger';
import { UserUser } from '../../user-user/entities/user-user.entity';
import { BlogArticle } from '../../blog-article/entities/blog-article.entity';
import { BlogArticleCommentContent } from '../../blog-article-comment-content/entities/blog-article-comment-content.entity';

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
