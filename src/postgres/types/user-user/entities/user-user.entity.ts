import { ApiProperty } from '@nestjs/swagger';
import { BlogArticle } from '../../blog-article/entities/blog-article.entity';
import { BlogArticleRating } from '../../blog-article-rating/entities/blog-article-rating.entity';
import { BlogArticleComment } from '../../blog-article-comment/entities/blog-article-comment.entity';

export class UserUser {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    passwordSalt: Buffer;
    passwordHash: Buffer;
    email: string;
    emailVerified: boolean;
    active: boolean;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
    articles?: BlogArticle[];
    articleRatings?: BlogArticleRating[];
    articleComments?: BlogArticleComment[];
}
