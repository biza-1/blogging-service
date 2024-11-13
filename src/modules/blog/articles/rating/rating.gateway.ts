import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { WebsocketConfig } from '../../../../config';
import { CONFIG_NAMESPACE } from '../../../../constants/config-namespace';

@WebSocketGateway(3001, { namespace: 'test' })
export class RatingGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;

    private readonly ratingEventName: string;

    constructor(configService: ConfigService) {
        const websocketConfig = configService.get<WebsocketConfig>(CONFIG_NAMESPACE.WEBSOCKET);

        this.ratingEventName = websocketConfig.ratingEventName;
    }

    // afterInit(server: Server) {
    afterInit() {
        this.server.emit('testing', { do: 'stuff' });
        // console.log(server);
    }

    emitRatingChange(articleId: string) {
        this.server.emit(this.ratingEventName, { articleId });
    }
}
