export enum WEBSOCKET_EVENT_NAME {
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',

    // article
    JOIN_ARTICLE = 'joinArticle',
    LEAVE_ARTICLE = 'leaveArticle',

    // article rating
    ARTICLE_RATING_UPDATED = 'articleRatingUpdated',

    // article comments
    ARTICLE_COMMENT_UPDATED = 'articleCommentUpdated',
    ARTICLE_COMMENT_CREATED = 'articleCommentCreated',
    ARTICLE_COMMENT_DELETED = 'articleCommentDeleted',
}

export enum WEBSOCKET_NAMESPACE {
    ARTICLE_RATING = 'articleRating',
    ARTICLE_COMMENTS = 'articleComments',
}
