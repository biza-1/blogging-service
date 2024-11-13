import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../providers/prisma/prisma.service';
import {
    BlogArticleCommentArrayContentResponseDto,
    BlogArticleCommentBodyDto,
    BlogArticleCommentResponseDto,
    BlogArticleCommentResponseDtoContent,
} from './dto/common-comments.dto';
import { CommentsGateway } from './comments.gateway';

@Injectable()
export class CommentsService {
    constructor(
        private prisma: PrismaService,
        private commentsGateway: CommentsGateway,
    ) {}

    async create(
        userId: string,
        articleId: string,
        body: BlogArticleCommentBodyDto,
    ): Promise<BlogArticleCommentResponseDto> {
        const articleComment = await this.prisma.blogArticleComment.create({
            data: {
                userId,
                articleId,
                content: {
                    create: {
                        text: body.content.text,
                    },
                },
            },
            select: {
                articleCommentId: true,
                userId: true,
                articleId: true,
                createdAt: true,
                content: {
                    select: {
                        articleCommentContentId: true,
                        createdAt: true,
                        text: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                },
            },
        });

        // emit changes for websocket
        this.commentsGateway.emitCommentsChange(articleId);

        return this.mapCommentResponse(articleComment);
    }

    async findAll(userId: string, articleId: string): Promise<BlogArticleCommentResponseDto[]> {
        const articleComments = await this.prisma.blogArticleComment.findMany({
            where: {
                userId,
                articleId,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                articleCommentId: true,
                userId: true,
                articleId: true,
                createdAt: true,
                content: {
                    select: {
                        articleCommentContentId: true,
                        createdAt: true,
                        text: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                },
            },
        });

        return articleComments.map(articleComment => this.mapCommentResponse(articleComment));
    }

    async findOne(
        userId: string,
        articleId: string,
        articleCommentId: string,
    ): Promise<BlogArticleCommentResponseDto | null> {
        const articleComment = await this.prisma.blogArticleComment.findUnique({
            where: {
                userId,
                articleId,
                articleCommentId,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                articleCommentId: true,
                userId: true,
                articleId: true,
                createdAt: true,
                content: {
                    select: {
                        articleCommentContentId: true,
                        createdAt: true,
                        text: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                },
            },
        });

        return this.mapCommentResponse(articleComment);
    }

    async findOneHistory(
        userId: string,
        articleId: string,
        articleCommentId: string,
    ): Promise<BlogArticleCommentArrayContentResponseDto | null> {
        return this.prisma.blogArticleComment.findUnique({
            where: {
                userId,
                articleId,
                articleCommentId,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                articleCommentId: true,
                userId: true,
                articleId: true,
                createdAt: true,
                content: {
                    select: {
                        articleCommentContentId: true,
                        createdAt: true,
                        text: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    }

    async update(
        userId: string,
        articleId: string,
        articleCommentId: string,
        body: BlogArticleCommentBodyDto,
    ): Promise<BlogArticleCommentResponseDto | null> {
        await this.prisma.blogArticleCommentContent.create({
            data: {
                articleCommentId,
                text: body.content.text,
            },
        });

        // emit changes for websocket
        this.commentsGateway.emitCommentsChange(articleId);

        return this.findOne(userId, articleId, articleCommentId);
    }

    async softDelete(userId: string, articleId: string, articleCommentId: string): Promise<boolean> {
        await this.prisma.blogArticleComment.update({
            where: {
                userId,
                articleId,
                articleCommentId,
                deletedAt: {
                    equals: null,
                },
            },
            data: { deletedAt: new Date() },
        });

        // emit changes for websocket
        this.commentsGateway.emitCommentsChange(articleId);

        return true;
    }

    private mapCommentArrayContentToObject(content?: BlogArticleCommentResponseDtoContent[]) {
        return (content as Array<BlogArticleCommentResponseDtoContent>)[0] ?? null;
    }

    private mapCommentResponse(
        articleComment?: BlogArticleCommentArrayContentResponseDto,
    ): BlogArticleCommentResponseDto {
        if (!articleComment) {
            return null;
        }

        return {
            articleCommentId: articleComment.articleCommentId,
            userId: articleComment.userId,
            articleId: articleComment.articleId,
            createdAt: articleComment.createdAt,
            // because prisma refuses to return as {} instead of [{}]
            content: this.mapCommentArrayContentToObject(articleComment.content),
        };
    }
}
