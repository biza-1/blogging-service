-- CreateTable
CREATE TABLE "UserUser"
(
    "user_id"        UUID         NOT NULL,
    "username"       TEXT         NOT NULL,
    "first_name"     TEXT         NOT NULL,
    "last_name"      TEXT         NOT NULL,
    "password_salt"  BYTEA        NOT NULL,
    "password_hash"  BYTEA        NOT NULL,
    "email"          TEXT         NOT NULL,
    "email_verified" BOOLEAN      NOT NULL,
    "active"         BOOLEAN      NOT NULL DEFAULT true,
    "created_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserUser_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "BlogArticle"
(
    "article_id" UUID         NOT NULL,
    "user_id"    UUID         NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_public"  BOOLEAN      NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogArticle_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "BlogArticleContent"
(
    "article_content_id" UUID         NOT NULL,
    "article_id"         UUID         NOT NULL,
    "title"              TEXT         NOT NULL,
    "perex"              TEXT         NOT NULL,
    "text"               TEXT         NOT NULL,
    "created_at"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogArticleContent_pkey" PRIMARY KEY ("article_content_id")
);

-- CreateTable
CREATE TABLE "BlogArticleComment"
(
    "article_comment_id" UUID         NOT NULL,
    "user_id"            UUID         NOT NULL,
    "article_id"         UUID         NOT NULL,
    "deleted_at"         TIMESTAMP(3),
    "created_at"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogArticleComment_pkey" PRIMARY KEY ("article_comment_id")
);

-- CreateTable
CREATE TABLE "BlogArticleCommentContent"
(
    "article_comment_content_id" UUID         NOT NULL,
    "article_comment_id"         UUID         NOT NULL,
    "created_at"                 TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text"                       TEXT         NOT NULL,

    CONSTRAINT "BlogArticleCommentContent_pkey" PRIMARY KEY ("article_comment_content_id")
);

-- CreateTable
CREATE TABLE "BlogArticleRating"
(
    "article_id" UUID         NOT NULL,
    "user_id"    UUID         NOT NULL,
    "rating"     INTEGER      NOT NULL,
    "ip_address" TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogArticleRating_pkey" PRIMARY KEY ("article_id", "user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserUser_username_key" ON "UserUser" ("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserUser_email_key" ON "UserUser" ("email");

-- AddForeignKey
ALTER TABLE "BlogArticle"
    ADD CONSTRAINT "BlogArticle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserUser" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticleContent"
    ADD CONSTRAINT "BlogArticleContent_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "BlogArticle" ("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticleComment"
    ADD CONSTRAINT "BlogArticleComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserUser" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticleComment"
    ADD CONSTRAINT "BlogArticleComment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "BlogArticle" ("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticleCommentContent"
    ADD CONSTRAINT "BlogArticleCommentContent_article_comment_id_fkey" FOREIGN KEY ("article_comment_id") REFERENCES "BlogArticleComment" ("article_comment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticleRating"
    ADD CONSTRAINT "BlogArticleRating_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "BlogArticle" ("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogArticleRating"
    ADD CONSTRAINT "BlogArticleRating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserUser" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- seed DB

INSERT INTO "UserUser" (user_id, username, first_name, last_name, password_salt, password_hash, email, email_verified,
                        active, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'username',
        'John',
        'Doe',
        '$2a$10$Q0har2PsuDPQoojMec6kSO',
        '$2a$10$Q0har2PsuDPQoojMec6kSOZUu.x9lGt8NLmwMgGuPM4V0LUrKdNRC',
        'john.doe@example.com',
        TRUE,
        TRUE,
        NOW());


INSERT INTO "BlogArticle" (article_id, user_id, is_public, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        TRUE,
        NOW());


INSERT INTO "BlogArticleContent" (article_content_id, article_id, title, perex, text, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'My First Article',
        'This is a short introduction to my first article.',
        'This is the main content of my first article.',
        NOW());


INSERT INTO "BlogArticleComment" (article_comment_id, user_id, article_id, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        NOW());


INSERT INTO "BlogArticleCommentContent" (article_comment_content_id, article_comment_id, text, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'Great article!',
        NOW());


INSERT INTO "BlogArticleRating" (article_id, user_id, rating, ip_address, created_at, updated_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        1,
        '192.168.0.1',
        NOW(),
        NOW());
