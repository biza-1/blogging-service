export class IpAndJwtPayloadRequestDto {
    user: {
        userId: string;
    };
    ip: string;
    headers: Record<string, string | undefined>;
}
