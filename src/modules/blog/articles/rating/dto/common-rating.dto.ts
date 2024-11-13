import { IsIn, IsInt } from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { BlogArticleRating } from '../../../../../postgres/types/blog-article-rating/entities';

export class BlogArticleRatingBodyDto {
    @IsInt()
    @IsIn([1, -1])
    rating: number;
}

export class ArticleRatingResponseDto extends PickType(BlogArticleRating, [
    'articleId',
    'userId',
    'rating',
]) {}
