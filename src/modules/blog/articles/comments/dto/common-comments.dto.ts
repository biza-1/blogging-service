import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsObjectOf } from '../../../../../helpers/decorators/is-object-of';
import { OmitType, PickType } from '@nestjs/swagger';
import { IsArrayOf } from '../../../../../helpers/decorators/is-array-of';
import { BlogArticleCommentContent } from '../../../../../postgres/types/blog-article-comment-content/entities';
import { BlogArticleComment } from '../../../../../postgres/types/blog-article-comment/entities';

export class BlogArticleCommentIdParamsDto {
    @IsString()
    @IsUUID(4)
    articleId: string;

    @IsString()
    @IsUUID(4)
    articleCommentId: string;
}

export class BlogArticleCommentBodyContentDto {
    @IsNotEmpty()
    @IsString()
    text: string;
}

export class BlogArticleCommentBodyDto {
    @IsObjectOf(() => BlogArticleCommentBodyContentDto)
    content: BlogArticleCommentBodyContentDto;
}

export class BlogArticleCommentResponseDtoContent extends PickType(BlogArticleCommentContent, [
    'articleCommentContentId',
    'createdAt',
    'text',
]) {}

export class BlogArticleCommentResponseDto extends PickType(BlogArticleComment, [
    'articleCommentId',
    'userId',
    'articleId',
    'createdAt',
]) {
    @IsObjectOf(() => BlogArticleCommentBodyContentDto)
    @IsOptional()
    content?: BlogArticleCommentResponseDtoContent;
}

export class BlogArticleCommentArrayContentResponseDto extends OmitType(BlogArticleCommentResponseDto, [
    'content',
]) {
    @IsArrayOf(() => BlogArticleCommentBodyContentDto)
    @IsOptional()
    content?: BlogArticleCommentResponseDtoContent[];
}
