import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadRequestDto } from '../../auth/dto/jwt-payload-request.dto';

export const CurrentUserId = createParamDecorator((_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<JwtPayloadRequestDto>();

    return request.user?.userId;
});
