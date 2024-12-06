import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/providers';
import { ArticleRatingResponseDto, BlogArticleRatingBodyDto } from './dto/common-rating.dto';
import { RatingGateway } from './rating.gateway';
import { LOG_CONTEXT } from '../../../../common/constants';

@Injectable()
export class RatingService {
    constructor(
        private prisma: PrismaService,
        private ratingGateway: RatingGateway,
    ) {}

    async upsert(
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

    async delete(userId: string, articleId: string): Promise<boolean> {
        try {
            await this.prisma.blogArticleRating.delete({
                where: { articleId_userId: { articleId, userId } },
            });

            // emit changes for websocket
            await this.emitRatingChange(articleId);

            return true;
        } catch (error) {
            console.error(LOG_CONTEXT.RATING_CONTROLLER, 'Error deleting rating:', error);

            return false;
        }
    }
}
