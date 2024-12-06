import { Injectable } from '@nestjs/common';
import {
    PublicArticleCommentHistoryResultDto,
    PublicArticleCommentsResponseDto,
    PublicArticleCommentsResponseDtoContent,
} from './dto/common-public-comments.dto';
import { PrismaService } from '../../../../../common/providers';

@Injectable()
export class PublicCommentsService {
    constructor(private prisma: PrismaService) {}

    async findAll(articleId: string): Promise<PublicArticleCommentsResponseDto[]> {
        const articleComments = await this.prisma.blogArticleComment.findMany({
            where: {
                articleId,
                deletedAt: {
                    equals: null,
                },
                article: {
                    isPublic: true,
                    deletedAt: {
                        equals: null,
                    },
                },
            },
            select: {
                articleCommentId: true,
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
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });

        return articleComments.map(articleComment => ({
            articleCommentId: articleComment.articleCommentId,
            createdAt: articleComment.createdAt,
            // because prisma refuses to return as {} instead of [{}]
            content: (articleComment.content as Array<PublicArticleCommentsResponseDtoContent>)[0] ?? null,
            user: articleComment.user,
        }));
    }

    async findOneHistory(
        articleId: string,
        articleCommentId: string,
    ): Promise<PublicArticleCommentHistoryResultDto | null> {
        return this.prisma.blogArticleComment.findUnique({
            where: {
                articleId,
                articleCommentId,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
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
}
