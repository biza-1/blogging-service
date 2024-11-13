import { PickType } from '@nestjs/swagger';
import { IsObjectOf } from '../../../../../../helpers/decorators/is-object-of';
import { IsOptional } from 'class-validator';
import { UserUser } from '../../../../../../postgres/types/user-user/entities';
import { BlogArticleCommentContent } from '../../../../../../postgres/types/blog-article-comment-content/entities';
import { BlogArticleComment } from '../../../../../../postgres/types/blog-article-comment/entities';
import { IsArrayOf } from '../../../../../../helpers/decorators/is-array-of';

export class BlogArticleResponseDtoUser extends PickType(UserUser, ['firstName', 'lastName']) {}

// find one comments

export class PublicArticleCommentsResponseDtoContent extends PickType(BlogArticleCommentContent, [
    'articleCommentContentId',
    'createdAt',
    'text',
]) {}

export class PublicArticleCommentsResponseDto extends PickType(BlogArticleComment, [
    'articleCommentId',
    'createdAt',
]) {
    @IsObjectOf(() => PublicArticleCommentsResponseDtoContent)
    @IsOptional()
    content?: PublicArticleCommentsResponseDtoContent;

    @IsObjectOf(() => BlogArticleResponseDtoUser)
    user: BlogArticleResponseDtoUser;
}

// find one history
export class PublicArticleCommentHistoryResultDto {
    @IsArrayOf(() => PublicArticleCommentsResponseDtoContent)
    content: PublicArticleCommentsResponseDtoContent[];
}
