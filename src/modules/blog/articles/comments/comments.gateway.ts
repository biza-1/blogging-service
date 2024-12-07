import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LOG_CONTEXT, WEBSOCKET_EVENT_NAME, WEBSOCKET_NAMESPACE } from '../../../../common/constants';
import { OnModuleInit } from '@nestjs/common';
import { BlogArticleCommentResponseDto } from './dto/common-comments.dto';
import { isUuid } from '../../../../common/validators';

@WebSocketGateway({ namespace: WEBSOCKET_NAMESPACE.ARTICLE_COMMENTS })
export class CommentsGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    // stores latest broadcasted rating to not send message if the rating did not change
    private articleRatings: Map<string, number> = new Map();

    constructor() {}

    onModuleInit() {
        this.server.on(WEBSOCKET_EVENT_NAME.CONNECTION, (socket: Socket) => {
            console.log(LOG_CONTEXT.COMMENTS_GATEWAY, `Client connected: ${socket.id}`);

            socket.on(WEBSOCKET_EVENT_NAME.JOIN_ARTICLE, (articleId: string) => {
                if (!isUuid(articleId)) {
                    console.log(
                        LOG_CONTEXT.COMMENTS_GATEWAY,
                        `Client ${socket.id} sent incorrect data: ${articleId}`,
                    );

                    return;
                }

                console.log(LOG_CONTEXT.COMMENTS_GATEWAY, `Client ${socket.id} joined article ${articleId}`);

                socket.join(articleId);
            });

            socket.on(WEBSOCKET_EVENT_NAME.LEAVE_ARTICLE, (articleId: string) => {
                if (!isUuid(articleId)) {
                    console.log(
                        LOG_CONTEXT.COMMENTS_GATEWAY,
                        `Client ${socket.id} sent incorrect data: ${articleId}`,
                    );

                    return;
                }

                console.log(LOG_CONTEXT.COMMENTS_GATEWAY, `Client ${socket.id} left article ${articleId}`);

                socket.leave(articleId);
            });

            socket.on(WEBSOCKET_EVENT_NAME.DISCONNECT, () => {
                console.log(LOG_CONTEXT.COMMENTS_GATEWAY, `Client disconnected: ${socket.id}`);
            });
        });
    }

    // Emit an event for a newly created comment.
    emitCommentCreated(articleId: string, commentId: string, comment: BlogArticleCommentResponseDto) {
        this.server
            .to(articleId)
            .emit(WEBSOCKET_EVENT_NAME.ARTICLE_COMMENT_CREATED, { articleId, commentId, comment });

        console.log(
            LOG_CONTEXT.COMMENTS_GATEWAY,
            `Emitted new comment for article ${articleId}: ${commentId}`,
        );
    }

    // Emit an event for an updated comment.
    emitCommentUpdated(articleId: string, commentId: string, updatedComment: BlogArticleCommentResponseDto) {
        this.server
            .to(articleId)
            .emit(WEBSOCKET_EVENT_NAME.ARTICLE_COMMENT_UPDATED, { articleId, commentId, updatedComment });

        console.log(
            LOG_CONTEXT.COMMENTS_GATEWAY,
            `Emitted updated comment for article ${articleId}: ${commentId}`,
        );
    }

    // Emit an event for a deleted comment.
    emitCommentDeleted(articleId: string, commentId: string) {
        this.server
            .to(articleId)
            .emit(WEBSOCKET_EVENT_NAME.ARTICLE_COMMENT_DELETED, { articleId, commentId });

        console.log(
            LOG_CONTEXT.COMMENTS_GATEWAY,
            `Emitted deleted comment for article ${articleId}: ${commentId}`,
        );
    }
}
