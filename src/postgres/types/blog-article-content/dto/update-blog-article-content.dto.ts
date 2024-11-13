import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogArticleContentDto {
    @IsOptional()
    @IsString()
    title?: string;
    @IsOptional()
    @IsString()
    perex?: string;
    @IsOptional()
    @IsString()
    text?: string;
}
