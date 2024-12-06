import { Module } from '../common/decorators/module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PublicBlogModule } from './public/blog/public-blog.module';

@Module({
    metadata: {
        imports: [AuthModule, BlogModule, PublicBlogModule],
    },
    children: [
        { path: 'auth', module: AuthModule },
        { path: 'blog', module: BlogModule },
        { path: 'public', module: PublicBlogModule },
    ],
})
export class ModulesModule {}
