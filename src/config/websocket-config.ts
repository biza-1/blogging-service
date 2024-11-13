import { registerAs } from '@nestjs/config';
import { CONFIG_NAMESPACE } from '../constants/config-namespace';

export interface WebsocketConfig {
    ratingEventName: string;
    commentsEventName: string;
}

export default registerAs(
    CONFIG_NAMESPACE.WEBSOCKET,
    (): WebsocketConfig => ({
        ratingEventName: process.env.RATING_EVENT_NAME as string,
        commentsEventName: process.env.COMMENTS_EVENT_NAME as string,
    }),
);
