import { ApiProperty } from '@nestjs/swagger';

export class BlogArticleRatingDto {
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
}
