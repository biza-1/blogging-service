import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsObjectOf } from '../../../../common/decorators/dto';

export class UpdateBlogArticleBodyContentDto {
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

export class UpdateBlogArticleBodyDto {
    @IsObjectOf(() => UpdateBlogArticleBodyContentDto)
    @IsOptional()
    content?: UpdateBlogArticleBodyContentDto;

    @IsNotEmpty()
    @IsBoolean()
    isPublic: boolean;
}
