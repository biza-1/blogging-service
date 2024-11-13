import { Test, TestingModule } from '@nestjs/testing';
import { PublicRatingService } from './public-rating.service';

xdescribe('PublicRatingService', () => {
    let service: PublicRatingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PublicRatingService],
        }).compile();

        service = module.get<PublicRatingService>(PublicRatingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
