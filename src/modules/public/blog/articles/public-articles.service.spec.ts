import { Test, TestingModule } from '@nestjs/testing';
import { PublicArticlesService } from './public-articles.service';

xdescribe('PublicArticlesService', () => {
    let service: PublicArticlesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PublicArticlesService],
        }).compile();

        service = module.get<PublicArticlesService>(PublicArticlesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
