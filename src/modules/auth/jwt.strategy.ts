import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { CONFIG_NAMESPACE } from '../../common/constants';
import { AuthConfig } from '../../common/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<AuthConfig>(CONFIG_NAMESPACE.AUTH).jwtSecretKey,
        });
    }

    async validate(payload: JwtPayload) {
        return { userId: payload.userId };
    }
}
