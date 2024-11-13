import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../providers/prisma/prisma.service';
import {
    PublicArticleResponseDto,
    PublicArticleResponseDtoContent,
    PublicArticlesResponseDto,
    PublicArticlesResponseDtoContent,
} from './dto/common-public-article.dto';

@Injectable()
export class PublicArticlesService {
    constructor(private prisma: PrismaService) {}

    async findAllPublic(): Promise<PublicArticlesResponseDto[]> {
        const blogArticles = await this.prisma.blogArticle.findMany({
            where: {
                isPublic: true,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                articleId: true,
                createdAt: true,
                content: {
                    select: {
                        title: true,
                        perex: true,
                        createdAt: true,
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

        return blogArticles.map(blogArticle => ({
            articleId: blogArticle.articleId,
            createdAt: blogArticle.createdAt,
            // because prisma refuses to return as {} instead of [{}]
            content: (blogArticle.content as Array<PublicArticleResponseDtoContent>)[0] ?? null,
            user: blogArticle.user,
        }));
    }

    async findOnePublic(articleId: string): Promise<PublicArticleResponseDto | null> {
        const blogArticle = await this.prisma.blogArticle.findUnique({
            where: {
                articleId,
                isPublic: true,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                articleId: true,
                createdAt: true,
                content: {
                    select: {
                        title: true,
                        perex: true,
                        text: true,
                        createdAt: true,
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

        if (!blogArticle) {
            return null;
        }

        return {
            articleId: blogArticle.articleId,
            createdAt: blogArticle.createdAt,
            // because prisma refuses to return as {} instead of [{}]
            content: (blogArticle.content as Array<PublicArticlesResponseDtoContent>)[0] ?? null,
            user: blogArticle.user,
        };
    }
}
