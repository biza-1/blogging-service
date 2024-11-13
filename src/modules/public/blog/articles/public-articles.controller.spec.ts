import { Test, TestingModule } from '@nestjs/testing';
import { PublicArticlesController } from './public-articles.controller';

xdescribe('PublicArticlesController', () => {
    let controller: PublicArticlesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PublicArticlesController],
        }).compile();

        controller = module.get<PublicArticlesController>(PublicArticlesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
