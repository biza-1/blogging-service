import { Module } from '../../../helpers/decorators/module';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { CommentsModule } from './comments/comments.module';
import { RatingModule } from './rating/rating.module';

@Module({
    metadata: {
        controllers: [ArticlesController],
        providers: [ArticlesService, PrismaService],
        imports: [CommentsModule, RatingModule],
    },
    children: [
        { path: ':articleId/comments', module: CommentsModule },
        { path: ':articleId/rating', module: RatingModule },
    ],
})
export class ArticlesModule {}
