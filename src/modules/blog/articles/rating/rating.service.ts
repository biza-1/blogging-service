import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../providers/prisma/prisma.service';
import { ArticleRatingResponseDto, BlogArticleRatingBodyDto } from './dto/common-rating.dto';
import { RatingGateway } from './rating.gateway';

@Injectable()
export class RatingService {
    constructor(
        private prisma: PrismaService,
        private ratingGateway: RatingGateway,
    ) {}

    async create(
        userId: string,
        articleId: string,
        ipAddress: string,
        body: BlogArticleRatingBodyDto,
    ): Promise<ArticleRatingResponseDto> {
        const { rating } = body;

        const articleRating = await this.prisma.blogArticleRating.upsert({
            where: {
                articleId_userId: { articleId, userId },
            },
            create: {
                userId,
                articleId,
                rating,
                ipAddress,
            },
            update: {
                rating,
                ipAddress,
            },
            select: {
                articleId: true,
                userId: true,
                rating: true,
            },
        });

        // emit changes for websocket
        await this.emitRatingChange(articleId);

        return articleRating;
    }

    async findOne(userId: string, articleId: string): Promise<ArticleRatingResponseDto | null> {
        return this.prisma.blogArticleRating.findUnique({
            where: { articleId_userId: { articleId, userId } },
            select: {
                articleId: true,
                userId: true,
                rating: true,
            },
        });
    }

    private async emitRatingChange(articleId: string) {
        const totalRating = await this.prisma.blogArticleRating.aggregate({
            where: {
                articleId,
                article: {
                    isPublic: true,
                    deletedAt: {
                        equals: null,
                    },
                },
            },
            _sum: {
                rating: true,
            },
        });

        const newRating = totalRating?._sum?.rating ?? 0;

        this.ratingGateway.emitRatingChange(articleId, newRating);
    }

    // async update(
    //     userId: string,
    //     articleId: string,
    //     body: BlogArticleRatingBodyDto,
    // ): Promise<ArticleRatingResponseDto | null> {
    //     const { rating } = body;
    //
    //
    //     const articleRating = await this.prisma.blogArticleRating.update({
    //         where: { articleId_userId: { articleId, userId } },
    //         data: { rating },
    //         select: {
    //             articleId: true,
    //             userId: true,
    //             rating: true,
    //         },
    //     });
    //
    //     // emit changes for websocket
    //     this.ratingGateway.emitRatingChange(articleId);
    //
    //     return articleRating;
    // }

    async delete(userId: string, articleId: string): Promise<boolean> {
        try {
            await this.prisma.blogArticleRating.delete({
                where: { articleId_userId: { articleId, userId } },
            });

            // emit changes for websocket
            await this.emitRatingChange(articleId);

            return true;
        } catch (error) {
            console.error('Error deleting rating:', error);

            return false;
        }
    }
}
