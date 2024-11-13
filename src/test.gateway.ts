import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3002, { namespace: 'test' })
export class WebSocketTestGateway {
    @WebSocketServer()
    server: Server;

    afterInit() {
        console.log('WebSocket server initialized on port 3002');
        this.server.on('connection', socket => {
            console.log('New client connected: ', socket.id);
        });
        this.server.emit('test_event', { message: 'WebSocket is working!' });
    }
}
