import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogArticleIdParamsDto } from '../dto/common-articles.dto';
import { ArticleRatingResponseDto, BlogArticleRatingBodyDto } from './dto/common-rating.dto';
import { RatingService } from './rating.service';
import { CurrentUserId, IpAddress } from '../../../../common/decorators/request';

@Controller('/')
@ApiTags('blog/articles/user/rating')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Post()
    @ApiOperation({ summary: 'Create or update blog article rating' })
    async create(
        @Param() params: BlogArticleIdParamsDto,
        @Body() body: BlogArticleRatingBodyDto,
        @CurrentUserId() userId: string,
        @IpAddress() ipAddress: string,
    ): Promise<ArticleRatingResponseDto> {
        return this.ratingService.create(userId, params.articleId, ipAddress, body);
    }

    @Get()
    @ApiOperation({ summary: 'Get a blog article current user rating' })
    async findAll(
        @Param() params: BlogArticleIdParamsDto,
        @CurrentUserId() userId: string,
    ): Promise<ArticleRatingResponseDto> {
        return this.ratingService.findOne(userId, params.articleId);
    }

    // @Put('')
    // @ApiOperation({ summary: 'Update a blog article rating' })
    // async update(
    //     @Param() params: BlogArticleIdParamsDto,
    //     @Body() body: BlogArticleRatingBodyDto,
    //     @Request() req: JwtPayloadRequestDto,
    // ): Promise<ArticleRatingResponseDto> {
    //     const userId = extractUserIdFromRequest(req);
    //
    //     const article = await this.ratingService.update(userId, params.articleId, body);
    //
    //     if (!article) {
    //         throw new HttpException('Article rating not found', HttpStatus.NOT_FOUND);
    //     }
    //
    //     return article;
    // }

    @Delete('')
    @ApiOperation({ summary: 'Delete a blog article rating' })
    async remove(@Param() params: BlogArticleIdParamsDto, @CurrentUserId() userId: string): Promise<void> {
        const success = await this.ratingService.delete(userId, params.articleId);

        if (!success) {
            throw new HttpException('Article rating not found', HttpStatus.NOT_FOUND);
        }
    }
}
