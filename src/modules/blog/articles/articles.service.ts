import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/providers';
import { CreateBlogArticleBodyDto } from './dto/create-blog-article.dto';
import { UpdateBlogArticleBodyDto } from './dto/update-blog-article.dto';
import { isDefined } from '../../../common/validators';
import {
    BlogArticleArrayContentResponseDto,
    BlogArticleResponseDto,
    BlogArticleResponseDtoContent,
} from './dto/common-articles.dto';

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, body: CreateBlogArticleBodyDto): Promise<BlogArticleResponseDto> {
        const blogArticle = await this.prisma.blogArticle.create({
            data: {
                userId: userId,
                isPublic: true,
                content: {
                    create: {
                        title: body.content.title,
                        perex: body.content.perex,
                        text: body.content.text,
                    },
                },
            },
            select: {
                articleId: true,
                isPublic: true,
                userId: true,
                createdAt: true,
                content: {
                    select: {
                        articleContentId: true,
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
            },
        });

        return this.mapArticleResponse(blogArticle);
    }

    async findAll(userId: string): Promise<BlogArticleResponseDto[]> {
        const blogArticles = await this.prisma.blogArticle.findMany({
            where: {
                userId,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                articleId: true,
                isPublic: true,
                userId: true,
                createdAt: true,
                content: {
                    select: {
                        articleContentId: true,
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
            },
        });

        return blogArticles.map(blogArticle => this.mapArticleResponse(blogArticle));
    }

    async findOne(userId: string, articleId: string): Promise<BlogArticleResponseDto | null> {
        const blogArticle = await this.prisma.blogArticle.findUnique({
            where: {
                userId,
                articleId,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                articleId: true,
                isPublic: true,
                userId: true,
                createdAt: true,
                content: {
                    select: {
                        articleContentId: true,
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
            },
        });

        return this.mapArticleResponse(blogArticle);
    }

    async findOneHistory(
        userId: string,
        articleId: string,
    ): Promise<BlogArticleArrayContentResponseDto | null> {
        return this.prisma.blogArticle.findUnique({
            where: {
                userId,
                articleId,
                deletedAt: {
                    equals: null,
                },
            },
            select: {
                articleId: true,
                isPublic: true,
                userId: true,
                createdAt: true,
                content: {
                    select: {
                        articleContentId: true,
                        title: true,
                        perex: true,
                        text: true,
                        createdAt: true,
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
        body: UpdateBlogArticleBodyDto,
    ): Promise<BlogArticleResponseDto | null> {
        const { isPublic } = body;

        await this.prisma.blogArticle.update({
            where: {
                userId,
                articleId,
                deletedAt: {
                    equals: null,
                },
            },
            data: { isPublic },
        });

        if (isDefined(body.content)) {
            await this.prisma.blogArticleContent.create({
                data: {
                    articleId,
                    title: body.content.title,
                    perex: body.content.perex,
                    text: body.content.text,
                },
            });
        }

        return this.findOne(userId, articleId);
    }

    async softDelete(userId: string, articleId: string): Promise<boolean> {
        await this.prisma.blogArticle.update({
            where: {
                userId,
                articleId,
                deletedAt: {
                    equals: null,
                },
            },
            data: { deletedAt: new Date() },
        });

        return true;
    }

    private mapArticleArrayContentToObject(content?: BlogArticleResponseDtoContent[]) {
        return (content as Array<BlogArticleResponseDtoContent>)[0] ?? null;
    }

    private mapArticleResponse(blogArticle?: BlogArticleArrayContentResponseDto): BlogArticleResponseDto {
        if (!blogArticle) {
            return null;
        }

        return {
            articleId: blogArticle.articleId,
            isPublic: blogArticle.isPublic,
            userId: blogArticle.userId,
            createdAt: blogArticle.createdAt,
            // because prisma refuses to return as {} instead of [{}]
            content: this.mapArticleArrayContentToObject(blogArticle.content),
        };
    }
}
