import { Test, TestingModule } from '@nestjs/testing';
import { PublicCommentsService } from './public-comments.service';

describe.skip('PublicCommentsService', () => {
    let service: PublicCommentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PublicCommentsService],
        }).compile();

        service = module.get<PublicCommentsService>(PublicCommentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
