import { IsInt } from 'class-validator';

export class PublicArticleRatingResultDto {
    @IsInt()
    rating: number;
}
