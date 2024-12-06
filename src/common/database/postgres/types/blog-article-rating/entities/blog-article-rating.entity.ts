import { ApiProperty } from '@nestjs/swagger';
import { BlogArticle } from '../../blog-article/entities';
import { UserUser } from '../../user-user/entities';

export class BlogArticleRating {
    articleId: string;
    userId: string;
    @ApiProperty({
        type: `integer`,
        format: `int32`,
    })
    rating: number;
    ipAddress: string;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    updatedAt: Date;
    article?: BlogArticle;
    user?: UserUser;
}
