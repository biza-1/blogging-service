import { IpAndJwtPayloadRequestDto } from '../modules/auth/dto/ip-and-jwt-payload-request.dto';
import { REQ_HEADERS } from '../constants/req-headers';

export function extractIpAddressFromRequest(req: IpAndJwtPayloadRequestDto): string {
    return req.headers[REQ_HEADERS.X_FORWARDED_FOR]?.split(',')[0] ?? req.ip ?? '';
}
