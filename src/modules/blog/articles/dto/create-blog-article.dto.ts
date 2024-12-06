import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IsObjectOf } from '../../../../common/decorators/dto';

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
