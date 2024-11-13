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
    Request,
    UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBlogArticleBodyDto } from './dto/create-blog-article.dto';
import { UpdateBlogArticleBodyDto } from './dto/update-blog-article.dto';
import { JwtPayloadRequestDto } from '../../auth/dto/jwt-payload-request.dto';
import { extractUserIdFromRequest } from '../../../helpers/extract-request-user-id';
import {
    BlogArticleArrayContentResponseDto,
    BlogArticleIdParamsDto,
    BlogArticleResponseDto,
} from './dto/common-articles.dto';

@Controller('/')
@ApiTags('blog/articles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new blog article' })
    async create(
        @Body() createBlogArticleDto: CreateBlogArticleBodyDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleResponseDto> {
        const userId = extractUserIdFromRequest(req);

        return this.articlesService.create(userId, createBlogArticleDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all blog articles' })
    async findAll(@Request() req: JwtPayloadRequestDto): Promise<BlogArticleResponseDto[]> {
        const userId = extractUserIdFromRequest(req);

        return this.articlesService.findAll(userId);
    }

    @Get(':articleId')
    @ApiOperation({ summary: 'Get a single blog article' })
    async findOne(
        @Param() params: BlogArticleIdParamsDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleResponseDto> {
        const userId = extractUserIdFromRequest(req);

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
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleArrayContentResponseDto> {
        const userId = extractUserIdFromRequest(req);

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
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleResponseDto> {
        const userId = extractUserIdFromRequest(req);

        try {
            const article = await this.articlesService.update(userId, params.articleId, body);

            if (!article) {
                throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
            }

            return article;
        } catch (e) {
            console.log('error updating article', e);

            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':articleId')
    @ApiOperation({ summary: 'Delete a blog article' })
    async remove(
        @Param() params: BlogArticleIdParamsDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<void> {
        const userId = extractUserIdFromRequest(req);

        const success = await this.articlesService.softDelete(userId, params.articleId);

        if (!success) {
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }
    }
}
