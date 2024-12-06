import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../../../../common/providers';
import { CommentsGateway } from './comments.gateway';

@Module({
    providers: [CommentsService, PrismaService, CommentsGateway],
    controllers: [CommentsController],
})
export class CommentsModule {}
