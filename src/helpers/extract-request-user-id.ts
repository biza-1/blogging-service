import { JwtPayloadRequestDto } from '../modules/auth/dto/jwt-payload-request.dto';

export function extractUserIdFromRequest(req: JwtPayloadRequestDto): string {
    return req.user.userId;
}
