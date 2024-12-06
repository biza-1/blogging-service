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
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtPayloadRequestDto } from '../../../auth/dto/jwt-payload-request.dto';
import { extractUserIdFromRequest } from '../../../../common/helpers/extract-request-user-id';
import { BlogArticleIdParamsDto } from '../dto/common-articles.dto';
import {
    BlogArticleCommentArrayContentResponseDto,
    BlogArticleCommentBodyDto,
    BlogArticleCommentIdParamsDto,
    BlogArticleCommentResponseDto,
} from './dto/common-comments.dto';
import { LOG_CONTEXT } from '../../../../common/constants';

@Controller('/')
@ApiTags('blog/articles/comments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new blog article comment' })
    async create(
        @Param() params: BlogArticleIdParamsDto,
        @Body() body: BlogArticleCommentBodyDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleCommentResponseDto> {
        const userId = extractUserIdFromRequest(req);

        return this.commentsService.create(userId, params.articleId, body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all blog article current user comments' })
    async findAll(
        @Param() params: BlogArticleIdParamsDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleCommentResponseDto[]> {
        const userId = extractUserIdFromRequest(req);

        return this.commentsService.findAll(userId, params.articleId);
    }

    @Get(':articleCommentId')
    @ApiOperation({ summary: 'Get a single blog article comment' })
    async findOne(
        @Param() params: BlogArticleCommentIdParamsDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleCommentResponseDto> {
        const userId = extractUserIdFromRequest(req);

        const articleComment = await this.commentsService.findOne(
            userId,
            params.articleId,
            params.articleCommentId,
        );

        if (!articleComment) {
            throw new HttpException('Article comment not found', HttpStatus.NOT_FOUND);
        }

        return articleComment;
    }

    @Get(':articleCommentId/history')
    @ApiOperation({ summary: 'Get a single blog article comment history' })
    async findOneHistory(
        @Param() params: BlogArticleCommentIdParamsDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleCommentArrayContentResponseDto> {
        const userId = extractUserIdFromRequest(req);

        const articleComment = await this.commentsService.findOneHistory(
            userId,
            params.articleId,
            params.articleCommentId,
        );

        if (!articleComment) {
            throw new HttpException('Article comment not found', HttpStatus.NOT_FOUND);
        }

        return articleComment;
    }

    @Put(':articleCommentId')
    @ApiOperation({ summary: 'Update a blog article comment' })
    async update(
        @Param() params: BlogArticleCommentIdParamsDto,
        @Body() body: BlogArticleCommentBodyDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<BlogArticleCommentResponseDto> {
        const userId = extractUserIdFromRequest(req);

        try {
            const articleComment = await this.commentsService.update(
                userId,
                params.articleId,
                params.articleCommentId,
                body,
            );

            if (!articleComment) {
                throw new HttpException('Article comment not found', HttpStatus.NOT_FOUND);
            }

            return articleComment;
        } catch (e) {
            console.log(LOG_CONTEXT.COMMENTS_CONTROLLER, 'Error updating article comment', e);

            throw new HttpException('Article comment not found', HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':articleCommentId')
    @ApiOperation({ summary: 'Delete a blog article comment' })
    async remove(
        @Param() params: BlogArticleCommentIdParamsDto,
        @Request() req: JwtPayloadRequestDto,
    ): Promise<void> {
        const userId = extractUserIdFromRequest(req);

        const success = await this.commentsService.softDelete(
            userId,
            params.articleId,
            params.articleCommentId,
        );

        if (!success) {
            throw new HttpException('Article comment not found', HttpStatus.NOT_FOUND);
        }
    }
}
