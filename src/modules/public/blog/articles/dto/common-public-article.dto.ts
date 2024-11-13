import { OmitType, PickType } from '@nestjs/swagger';
import { BlogArticleContent } from '../../../../../postgres/types/blog-article-content/entities';
import { BlogArticle } from '../../../../../postgres/types/blog-article/entities';
import { IsObjectOf } from '../../../../../helpers/decorators/is-object-of';
import { BlogArticleCommentBodyContentDto } from '../../../../blog/articles/comments/dto/common-comments.dto';
import { IsOptional } from 'class-validator';
import { UserUser } from '../../../../../postgres/types/user-user/entities';

export class BlogArticleResponseDtoUser extends PickType(UserUser, ['firstName', 'lastName']) {}

// find all
export class PublicArticleResponseDtoContent extends PickType(BlogArticleContent, [
    'perex',
    'title',
    'createdAt',
]) {}

export class PublicArticlesResponseDto extends PickType(BlogArticle, ['articleId', 'createdAt']) {
    @IsObjectOf(() => BlogArticleCommentBodyContentDto)
    @IsOptional()
    content?: PublicArticleResponseDtoContent;

    @IsObjectOf(() => BlogArticleResponseDtoUser)
    user: BlogArticleResponseDtoUser;
}

// find one
export class PublicArticlesResponseDtoContent extends PickType(BlogArticleContent, [
    'perex',
    'title',
    'text',
    'createdAt',
]) {}

export class PublicArticleResponseDto extends OmitType(PublicArticlesResponseDto, ['content']) {
    @IsObjectOf(() => PublicArticlesResponseDtoContent)
    @IsOptional()
    content?: PublicArticlesResponseDtoContent;
}
