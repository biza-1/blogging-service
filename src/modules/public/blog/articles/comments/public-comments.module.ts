import { Module } from '@nestjs/common';
import { PublicCommentsService } from './public-comments.service';
import { PublicCommentsController } from './public-comments.controller';
import { PrismaService } from '../../../../../common/providers';

@Module({
    providers: [PublicCommentsService, PrismaService],
    controllers: [PublicCommentsController],
})
export class PublicCommentsModule {}
