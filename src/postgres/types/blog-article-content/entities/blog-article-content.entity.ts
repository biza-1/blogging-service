import { ApiProperty } from '@nestjs/swagger';
import { BlogArticle } from '../../blog-article/entities/blog-article.entity';

export class BlogArticleContent {
    articleContentId: string;
    articleId: string;
    title: string;
    perex: string;
    text: string;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
    article?: BlogArticle;
}
