import { ApiProperty } from '@nestjs/swagger';

export class BlogArticleDto {
    articleId: string;
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
}
