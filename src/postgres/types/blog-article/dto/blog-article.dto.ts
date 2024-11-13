import { ApiProperty } from '@nestjs/swagger';

export class BlogArticleDto {
    articleId: string;
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
}
