import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WEBSOCKET_EVENT_NAME, WEBSOCKET_NAMESPACE } from '../../../../constants/websocket';
import { OnModuleInit } from '@nestjs/common';
import { BlogArticleCommentResponseDto } from './dto/common-comments.dto';

@WebSocketGateway({ namespace: WEBSOCKET_NAMESPACE.ARTICLE_COMMENTS })
export class CommentsGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    // stores latest broadcasted rating to not send message if the rating did not change
    private articleRatings: Map<string, number> = new Map();

    constructor() {}

    onModuleInit() {
        this.server.on(WEBSOCKET_EVENT_NAME.CONNECTION, (socket: Socket) => {
            console.log(`[CommentsGateway] Client connected: ${socket.id}`);

            socket.on(WEBSOCKET_EVENT_NAME.JOIN_ARTICLE, (articleId: string) => {
                if (!this.isValidArticleId(articleId)) {
                    console.log(`[CommentsGateway] Client ${socket.id} sent incorrect data: ${articleId}`);
                    return;
                }

                console.log(`[CommentsGateway] Client ${socket.id} joined article ${articleId}`);
                socket.join(articleId);
            });

            socket.on(WEBSOCKET_EVENT_NAME.LEAVE_ARTICLE, (articleId: string) => {
                if (!this.isValidArticleId(articleId)) {
                    console.log(`[CommentsGateway] Client ${socket.id} sent incorrect data: ${articleId}`);
                    return;
                }

                console.log(`[CommentsGateway] Client ${socket.id} left article ${articleId}`);
                socket.leave(articleId);
            });

            socket.on(WEBSOCKET_EVENT_NAME.DISCONNECT, () => {
                console.log(`[CommentsGateway] Client disconnected: ${socket.id}`);
            });
        });
    }

    // Emit an event for a newly created comment.
    emitCommentCreated(articleId: string, commentId: string, comment: BlogArticleCommentResponseDto) {
        this.server
            .to(articleId)
            .emit(WEBSOCKET_EVENT_NAME.ARTICLE_COMMENT_CREATED, { articleId, commentId, comment });

        console.log(`[CommentsGateway] Emitted new comment for article ${articleId}: ${commentId}`);
    }

    // Emit an event for an updated comment.
    emitCommentUpdated(articleId: string, commentId: string, updatedComment: BlogArticleCommentResponseDto) {
        this.server
            .to(articleId)
            .emit(WEBSOCKET_EVENT_NAME.ARTICLE_COMMENT_UPDATED, { articleId, commentId, updatedComment });

        console.log(`[CommentsGateway] Emitted updated comment for article ${articleId}: ${commentId}`);
    }

    // Emit an event for a deleted comment.
    emitCommentDeleted(articleId: string, commentId: string) {
        this.server
            .to(articleId)
            .emit(WEBSOCKET_EVENT_NAME.ARTICLE_COMMENT_DELETED, { articleId, commentId });

        console.log(`[CommentsGateway] Emitted deleted comment for article ${articleId}: ${commentId}`);
    }

    private isValidArticleId(articleId: string): boolean {
        return typeof articleId === 'string' && articleId.trim().length > 0;
    }
}
