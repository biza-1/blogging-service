import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PublicArticlesService } from './public-articles.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogArticleIdParamsDto } from '../../../blog/articles/dto/common-articles.dto';
import { PublicArticleResponseDto, PublicArticlesResponseDto } from './dto/common-public-article.dto';

@Controller('/')
@ApiTags('public/blog/articles')
export class PublicArticlesController {
    constructor(private readonly publicArticlesService: PublicArticlesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all public blog articles' })
    async findAllPublic(): Promise<PublicArticlesResponseDto[]> {
        return this.publicArticlesService.findAllPublic();
    }

    @Get(':articleId')
    @ApiOperation({ summary: 'Get a single public blog article' })
    async findOne(@Param() params: BlogArticleIdParamsDto): Promise<PublicArticleResponseDto> {
        const article = await this.publicArticlesService.findOnePublic(params.articleId);

        if (!article) {
            throw new HttpException('Public article not found', HttpStatus.NOT_FOUND);
        }

        return article;
    }
}
