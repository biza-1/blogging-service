import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogArticleCommentContentDto {
    @IsNotEmpty()
    @IsString()
    text: string;
}
