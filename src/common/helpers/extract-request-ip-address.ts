import { IpAndJwtPayloadRequestDto } from '../../modules/auth/dto/ip-and-jwt-payload-request.dto';
import { REQ_HEADER } from '../constants';

export function extractIpAddressFromRequest(req: IpAndJwtPayloadRequestDto): string {
    return req.headers[REQ_HEADER.X_FORWARDED_FOR]?.split(',')[0] ?? req.ip ?? '';
}
