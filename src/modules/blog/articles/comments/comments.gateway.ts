import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { WebsocketConfig } from '../../../../config';
import { CONFIG_NAMESPACE } from '../../../../constants/config-namespace';

@WebSocketGateway()
export class CommentsGateway {
    @WebSocketServer()
    server: Server;

    private readonly commentsEventName: string;

    constructor(configService: ConfigService) {
        const websocketConfig = configService.get<WebsocketConfig>(CONFIG_NAMESPACE.WEBSOCKET);

        this.commentsEventName = websocketConfig.commentsEventName;
    }

    emitCommentsChange(articleId: string) {
        this.server.emit(this.commentsEventName, { articleId });
    }
}
