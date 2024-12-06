import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IpAndJwtPayloadRequestDto } from '../../auth/dto/ip-and-jwt-payload-request.dto';
import { FALLBACK_IP, REQ_HEADER } from '../../constants';

export const IpAddress = createParamDecorator((_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<IpAndJwtPayloadRequestDto>();

    return request.headers[REQ_HEADER.X_FORWARDED_FOR]?.split(',')[0] ?? request.ip ?? FALLBACK_IP;
});
