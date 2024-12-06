import { Module } from '../../../../common/decorators/module';
import { PublicArticlesService } from './public-articles.service';
import { PublicArticlesController } from './public-articles.controller';
import { PublicRatingModule } from './rating/public-rating.module';
import { PublicCommentsModule } from './comments/public-comments.module';
import { PrismaService } from '../../../../common/providers';

@Module({
    metadata: {
        providers: [PublicArticlesService, PrismaService],
        controllers: [PublicArticlesController],
        imports: [PublicRatingModule, PublicCommentsModule],
    },
    children: [
        { path: ':articleId/rating', module: PublicRatingModule },
        { path: ':articleId/comments', module: PublicCommentsModule },
    ],
})
export class PublicArticlesModule {}
