import { ApiProperty } from '@nestjs/swagger';
import { UserUser } from '../../user-user/entities/user-user.entity';
import { BlogArticleRating } from '../../blog-article-rating/entities/blog-article-rating.entity';
import { BlogArticleComment } from '../../blog-article-comment/entities/blog-article-comment.entity';
import { BlogArticleContent } from '../../blog-article-content/entities/blog-article-content.entity';

export class BlogArticle {
    articleId: string;
    userId: string;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    deletedAt: Date | null;
    isPublic: boolean;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
    user?: UserUser;
    ratings?: BlogArticleRating[];
    comments?: BlogArticleComment[];
    content?: BlogArticleContent[];
}
