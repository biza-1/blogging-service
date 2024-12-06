import { PickType } from '@nestjs/swagger';
import { IsArrayOf, IsObjectOf } from '../../../../../../common/decorators/dto';
import { IsOptional } from 'class-validator';
import { UserUser } from '../../../../../../common/database/postgres/types/user-user/entities';
import { BlogArticleCommentContent } from '../../../../../../common/database/postgres/types/blog-article-comment-content/entities';
import { BlogArticleComment } from '../../../../../../common/database/postgres/types/blog-article-comment/entities';

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
