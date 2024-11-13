import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaService } from '../../../../providers/prisma/prisma.service';
import { RatingGateway } from './rating.gateway';

@Module({
    providers: [RatingService, PrismaService, RatingGateway],
    controllers: [RatingController],
})
export class RatingModule {}
