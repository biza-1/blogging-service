export enum LOG_CONTEXT {
    // prisma
    PRISMA_SEED = '[PrismaSeed]',

    // controllers
    AUTH_CONTROLLER = '[AuthController]',
    COMMENTS_CONTROLLER = '[CommentsController]',
    ARTICLES_CONTROLLER = '[ArticlesController]',
    RATING_CONTROLLER = '[RatingController]',

    // gateways
    COMMENTS_GATEWAY = '[CommentsGateway]',
    RATING_GATEWAY = '[RatingGateway]',
}
