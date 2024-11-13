import { IsOptional, IsString, IsUUID } from 'class-validator';
import { OmitType, PickType } from '@nestjs/swagger';
import { BlogArticle } from '../../../../postgres/types/blog-article/entities';
import { BlogArticleContent } from '../../../../postgres/types/blog-article-content/entities';
import { IsObjectOf } from '../../../../helpers/decorators/is-object-of';
import { BlogArticleCommentBodyContentDto } from '../comments/dto/common-comments.dto';
import { IsArrayOf } from '../../../../helpers/decorators/is-array-of';

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
