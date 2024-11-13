import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogArticleContentDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    perex: string;
    @IsNotEmpty()
    @IsString()
    text: string;
}
