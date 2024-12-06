import { Module } from '@nestjs/common';
import { PublicRatingService } from './public-rating.service';
import { PublicRatingController } from './public-rating.controller';
import { PrismaService } from '../../../../../common/providers';

@Module({
    providers: [PublicRatingService, PrismaService],
    controllers: [PublicRatingController],
})
export class PublicRatingModule {}
