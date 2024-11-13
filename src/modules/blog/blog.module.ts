import { Module } from '../../helpers/decorators/module';
import { ArticlesModule } from './articles/articles.module';

@Module({
    metadata: {
        imports: [ArticlesModule],
    },
    children: [{ path: 'articles', module: ArticlesModule }],
})
export class BlogModule {}
