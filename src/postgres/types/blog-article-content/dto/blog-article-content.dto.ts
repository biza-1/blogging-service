import { ApiProperty } from '@nestjs/swagger';

export class BlogArticleContentDto {
    articleContentId: string;
    title: string;
    perex: string;
    text: string;
    @ApiProperty({
        type: `string`,
        format: `date-time`,
    })
    createdAt: Date;
}
