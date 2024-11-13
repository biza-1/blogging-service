import { Module } from '../../../helpers/decorators/module';
import { PublicArticlesModule } from './articles/public-articles.module';

@Module({
    metadata: {
        imports: [PublicArticlesModule],
    },
    children: [{ path: 'articles', module: PublicArticlesModule }],
})
export class PublicBlogModule {}
