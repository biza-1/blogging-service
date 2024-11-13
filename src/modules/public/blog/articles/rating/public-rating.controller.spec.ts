import { Test, TestingModule } from '@nestjs/testing';
import { PublicRatingController } from './public-rating.controller';

xdescribe('PublicRatingController', () => {
    let controller: PublicRatingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PublicRatingController],
        }).compile();

        controller = module.get<PublicRatingController>(PublicRatingController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
