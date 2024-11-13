import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogArticleIdParamsDto } from '../../../../blog/articles/dto/common-articles.dto';
import {
    PublicArticleCommentHistoryResultDto,
    PublicArticleCommentsResponseDto,
} from './dto/common-public-comments.dto';
import { BlogArticleCommentIdParamsDto } from '../../../../blog/articles/comments/dto/common-comments.dto';
import { PublicCommentsService } from './public-comments.service';

@Controller('/')
@ApiTags('public/blog/articles/comments')
export class PublicCommentsController {
    constructor(private readonly publicCommentsService: PublicCommentsService) {}

    @Get('comments')
    @ApiOperation({ summary: 'Get a single blog article comments' })
    async findOneComments(
        @Param() params: BlogArticleIdParamsDto,
    ): Promise<PublicArticleCommentsResponseDto[]> {
        return this.publicCommentsService.findAll(params.articleId);
    }

    @Get(':articleCommentId/history')
    @ApiOperation({ summary: 'Get a single blog article comments' })
    async findOneHistory(
        @Param() params: BlogArticleCommentIdParamsDto,
    ): Promise<PublicArticleCommentHistoryResultDto> {
        const commentHistory = await this.publicCommentsService.findOneHistory(
            params.articleId,
            params.articleCommentId,
        );

        if (!commentHistory) {
            throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
        }

        return commentHistory;
    }
}
