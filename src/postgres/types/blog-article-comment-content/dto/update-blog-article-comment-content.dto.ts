import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogArticleCommentContentDto {
    @IsOptional()
    @IsString()
    text?: string;
}
