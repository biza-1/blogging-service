import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { JwtPayloadRequestDto } from '../../../auth/dto/jwt-payload-request.dto';
import { extractUserIdFromRequest } from '../../../../helpers/extract-request-user-id';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogArticleIdParamsDto } from '../dto/common-articles.dto';
import { ArticleRatingResponseDto, BlogArticleRatingBodyDto } from './dto/common-rating.dto';
import { RatingService } from './rating.service';
import { IpAndJwtPayloadRequestDto } from '../../../auth/dto/ip-and-jwt-payload-request.dto';
import { extractIpAddressFromRequest } from '../../../../helpers/extract-request-ip-address';

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
        @Request() req: IpAndJwtPayloadRequestDto,
    ): Promise<ArticleRatingResponseDto> {
        const userId = extractUserIdFromRequest(req);

        const ipAddress = extractIpAddressFromRequest(req);

        return this.ratingService.create(userId, params.articleId, ipAddress, body);
    }

    @Get()
    @ApiOperation({ summary: 'Get a blog article current user rating' })
    async findAll(
        @Param() params: BlogArticleIdParamsDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<ArticleRatingResponseDto> {
        const userId = extractUserIdFromRequest(req);

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
    async remove(
        @Param() params: BlogArticleIdParamsDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<void> {
        const userId = extractUserIdFromRequest(req);

        const success = await this.ratingService.delete(userId, params.articleId);

        if (!success) {
            throw new HttpException('Article rating not found', HttpStatus.NOT_FOUND);
        }
    }
}
