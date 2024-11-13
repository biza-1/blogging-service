import { Controller, Get, Param } from '@nestjs/common';
import { PublicRatingService } from './public-rating.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogArticleIdParamsDto } from '../../../../blog/articles/dto/common-articles.dto';
import { PublicArticleRatingResultDto } from './dto/common-public-rating.dto';

@Controller('/')
@ApiTags('public/blog/articles/rating')
export class PublicRatingController {
    constructor(private readonly publicRatingService: PublicRatingService) {}

    @Get('')
    @ApiOperation({ summary: 'Get a single blog article rating' })
    async findOne(@Param() params: BlogArticleIdParamsDto): Promise<PublicArticleRatingResultDto> {
        return this.publicRatingService.findTotalArticleRating(params.articleId);
    }
}
