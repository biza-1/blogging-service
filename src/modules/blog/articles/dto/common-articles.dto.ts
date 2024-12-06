import { IsOptional, IsString, IsUUID } from 'class-validator';
import { OmitType, PickType } from '@nestjs/swagger';
import { BlogArticle } from '../../../../common/database/postgres/types/blog-article/entities';
import { BlogArticleContent } from '../../../../common/database/postgres/types/blog-article-content/entities';
import { IsArrayOf, IsObjectOf } from '../../../../common/decorators/dto';
import { BlogArticleCommentBodyContentDto } from '../comments/dto/common-comments.dto';

export class BlogArticleIdParamsDto {
    @IsString()
    @IsUUID(4)
    articleId: string;
}

export class BlogArticleResponseDtoContent extends PickType(BlogArticleContent, [
    'articleContentId',
    'perex',
    'title',
    'text',
    'createdAt',
]) {}

export class BlogArticleResponseDto extends PickType(BlogArticle, [
    'articleId',
    'isPublic',
    'userId',
    'createdAt',
]) {
    @IsObjectOf(() => BlogArticleCommentBodyContentDto)
    @IsOptional()
    content?: BlogArticleResponseDtoContent;
}

export class BlogArticleArrayContentResponseDto extends OmitType(BlogArticleResponseDto, ['content']) {
    @IsArrayOf(() => BlogArticleCommentBodyContentDto)
    @IsOptional()
    content?: BlogArticleResponseDtoContent[];
}
