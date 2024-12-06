import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBlogArticleBodyDto } from './dto/create-blog-article.dto';
import { UpdateBlogArticleBodyDto } from './dto/update-blog-article.dto';
import {
    BlogArticleArrayContentResponseDto,
    BlogArticleIdParamsDto,
    BlogArticleResponseDto,
} from './dto/common-articles.dto';
import { LOG_CONTEXT } from '../../../common/constants';
import { CurrentUserId } from '../../../common/decorators/request';

@Controller('/')
@ApiTags('blog/articles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new blog article' })
    async create(
        @Body() body: CreateBlogArticleBodyDto,
        @CurrentUserId() userId: string,
    ): Promise<BlogArticleResponseDto> {
        return this.articlesService.create(userId, body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all blog articles' })
    async findAll(@CurrentUserId() userId: string): Promise<BlogArticleResponseDto[]> {
        return this.articlesService.findAll(userId);
    }

    @Get(':articleId')
    @ApiOperation({ summary: 'Get a single blog article' })
    async findOne(
        @Param() params: BlogArticleIdParamsDto,
        @CurrentUserId() userId: string,
    ): Promise<BlogArticleResponseDto> {
        const article = await this.articlesService.findOne(userId, params.articleId);

        if (!article) {
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }

        return article;
    }

    @Get(':articleId/history')
    @ApiOperation({ summary: 'Get a single blog article history' })
    async findOneHistory(
        @Param() params: BlogArticleIdParamsDto,
        @CurrentUserId() userId: string,
    ): Promise<BlogArticleArrayContentResponseDto> {
        const article = await this.articlesService.findOneHistory(userId, params.articleId);

        if (!article) {
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }

        return article;
    }

    @Put(':articleId')
    @ApiOperation({ summary: 'Update a blog article' })
    async update(
        @Param() params: BlogArticleIdParamsDto,
        @Body() body: UpdateBlogArticleBodyDto,
        @CurrentUserId() userId: string,
    ): Promise<BlogArticleResponseDto> {
        try {
            const article = await this.articlesService.update(userId, params.articleId, body);

            if (!article) {
                throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
            }

            return article;
        } catch (e) {
            console.log(LOG_CONTEXT.ARTICLES_CONTROLLER, 'Error updating article', e);

            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':articleId')
    @ApiOperation({ summary: 'Delete a blog article' })
    async remove(@Param() params: BlogArticleIdParamsDto, @CurrentUserId() userId: string): Promise<void> {
        const success = await this.articlesService.softDelete(userId, params.articleId);

        if (!success) {
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }
    }
}
