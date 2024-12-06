import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LOG_CONTEXT, WEBSOCKET_EVENT_NAME, WEBSOCKET_NAMESPACE } from '../../../../common/constants';
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
            console.log(LOG_CONTEXT.RATING_GATEWAY, `Client connected: ${socket.id}`);

            socket.on(WEBSOCKET_EVENT_NAME.JOIN_ARTICLE, (articleId: string) => {
                if (!this.isValidArticleId(articleId)) {
                    console.log(
                        LOG_CONTEXT.RATING_GATEWAY,
                        `Client ${socket.id} sent incorrect data: ${articleId}`,
                    );

                    return;
                }

                console.log(LOG_CONTEXT.RATING_GATEWAY, `Client ${socket.id} joined article ${articleId}`);

                socket.join(articleId);
            });

            socket.on(WEBSOCKET_EVENT_NAME.LEAVE_ARTICLE, (articleId: string) => {
                if (!this.isValidArticleId(articleId)) {
                    console.log(
                        LOG_CONTEXT.RATING_GATEWAY,
                        `Client ${socket.id} sent incorrect data: ${articleId}`,
                    );

                    return;
                }

                console.log(LOG_CONTEXT.RATING_GATEWAY, `Client ${socket.id} left article ${articleId}`);

                socket.leave(articleId);
            });

            socket.on(WEBSOCKET_EVENT_NAME.DISCONNECT, () => {
                console.log(LOG_CONTEXT.RATING_GATEWAY, `Client disconnected: ${socket.id}`);
            });
        });
    }

    // Emit an updated rating for a specific article to all clients in the article room.
    emitRatingChange(articleId: string, newRating: number) {
        // validate if the rating changed
        const currentRating = this.articleRatings.get(articleId);

        if (currentRating === newRating) {
            console.log(
                LOG_CONTEXT.RATING_GATEWAY,
                `Article ${articleId} did not change rating: ${newRating}`,
            );

            return;
        }

        this.articleRatings.set(articleId, newRating);

        this.server
            .to(articleId)
            .emit(WEBSOCKET_EVENT_NAME.ARTICLE_RATING_UPDATED, { articleId, rating: newRating });

        console.log(LOG_CONTEXT.RATING_GATEWAY, `Emitted new rating for article ${articleId}: ${newRating}`);
    }

    private isValidArticleId(articleId: string): boolean {
        return typeof articleId === 'string' && articleId.trim().length > 0;
    }
}
