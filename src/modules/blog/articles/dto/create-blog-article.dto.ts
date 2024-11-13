import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IsObjectOf } from '../../../../helpers/decorators/is-object-of';

export class CreateBlogArticleBodyContentDto {
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

export class CreateBlogArticleBodyDto {
    @IsObjectOf(() => CreateBlogArticleBodyContentDto)
    content: CreateBlogArticleBodyContentDto;

    @IsNotEmpty()
    @IsBoolean()
    isPublic: boolean;
}
