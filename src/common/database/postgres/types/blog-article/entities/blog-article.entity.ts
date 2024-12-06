import { ApiProperty } from '@nestjs/swagger';
import { UserUser } from '../../user-user/entities';
import { BlogArticleRating } from '../../blog-article-rating/entities';
import { BlogArticleComment } from '../../blog-article-comment/entities';
import { BlogArticleContent } from '../../blog-article-content/entities';

export class BlogArticle {
    articleId: string;
    userId: string;
    isPublic: boolean;
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
    ratings?: BlogArticleRating[];
    comments?: BlogArticleComment[];
    content?: BlogArticleContent[];
}
