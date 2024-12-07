import { ApiProperty } from '@nestjs/swagger';
import { BlogArticle } from '../../blog-article/entities';
import { BlogArticleRating } from '../../blog-article-rating/entities';
import { BlogArticleComment } from '../../blog-article-comment/entities';

export class UserUser {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
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
