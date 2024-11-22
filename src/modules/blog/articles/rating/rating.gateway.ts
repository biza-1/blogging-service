import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WEBSOCKET_EVENT_NAME, WEBSOCKET_NAMESPACE } from '../../../../constants/websocket';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({ namespace: WEBSOCKET_NAMESPACE.ARTICLE_RATING })
export class RatingGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    // stores latest broadcasted rating to not send message if the rating did not change
    private articleRatings: Map<string, number> = new Map();

    constructor() {}

    onModuleInit() {
        this.server.on(WEBSOCKET_EVENT_NAME.CONNECTION, (socket: Socket) => {
            console.log(`[RatingGateway] Client connected: ${socket.id}`);

            socket.on(WEBSOCKET_EVENT_NAME.JOIN_ARTICLE, (articleId: string) => {
                if (!this.isValidArticleId(articleId)) {
                    console.log(`[RatingGateway] Client ${socket.id} sent incorrect data: ${articleId}`);

                    return;
                }

                console.log(`[RatingGateway] Client ${socket.id} joined article ${articleId}`);

                socket.join(articleId);
            });

            socket.on(WEBSOCKET_EVENT_NAME.LEAVE_ARTICLE, (articleId: string) => {
                if (!this.isValidArticleId(articleId)) {
                    console.log(`[RatingGateway] Client ${socket.id} sent incorrect data: ${articleId}`);

                    return;
                }

                console.log(`[RatingGateway] Client ${socket.id} left article ${articleId}`);

                socket.leave(articleId);
            });

            socket.on(WEBSOCKET_EVENT_NAME.DISCONNECT, () => {
                console.log(`[RatingGateway] Client disconnected: ${socket.id}`);
            });
        });
    }

    // Emit an updated rating for a specific article to all clients in the article room.
    emitRatingChange(articleId: string, newRating: number) {
        // validate if the rating changed
        const currentRating = this.articleRatings.get(articleId);

        if (currentRating === newRating) {
            console.log(`Article ${articleId} did not change rating: ${newRating}`);

            return;
        }

        this.articleRatings.set(articleId, newRating);

        this.server
            .to(articleId)
            .emit(WEBSOCKET_EVENT_NAME.ARTICLE_RATING_UPDATED, { articleId, rating: newRating });

        console.log(`[RatingGateway] Emitted new rating for article ${articleId}: ${newRating}`);
    }

    private isValidArticleId(articleId: string): boolean {
        return typeof articleId === 'string' && articleId.trim().length > 0;
    }
}
