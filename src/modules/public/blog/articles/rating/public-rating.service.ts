import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/providers';
import { PublicArticleRatingResultDto } from './dto/common-public-rating.dto';

@Injectable()
export class PublicRatingService {
    constructor(private prisma: PrismaService) {}

    async findTotalArticleRating(articleId: string): Promise<PublicArticleRatingResultDto> {
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

        return {
            rating: totalRating?._sum?.rating ?? 0,
        };
    }
}
