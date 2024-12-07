-- CreateTable
CREATE TABLE "user.user"
(
    "user_id"        UUID         NOT NULL,
    "username"       TEXT         NOT NULL,
    "first_name"     TEXT         NOT NULL,
    "last_name"      TEXT         NOT NULL,
    "password_hash"  BYTEA        NOT NULL,
    "email"          TEXT         NOT NULL,
    "email_verified" BOOLEAN      NOT NULL,
    "active"         BOOLEAN      NOT NULL DEFAULT true,
    "created_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "blog.article"
(
    "article_id" UUID         NOT NULL,
    "user_id"    UUID         NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_public"  BOOLEAN      NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "blog.article_content"
(
    "article_content_id" UUID         NOT NULL,
    "article_id"         UUID         NOT NULL,
    "title"              TEXT         NOT NULL,
    "perex"              TEXT         NOT NULL,
    "text"               TEXT         NOT NULL,
    "created_at"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_article_content_pkey" PRIMARY KEY ("article_content_id")
);

-- CreateTable
CREATE TABLE "blog.article_comment"
(
    "article_comment_id" UUID         NOT NULL,
    "user_id"            UUID         NOT NULL,
    "article_id"         UUID         NOT NULL,
    "deleted_at"         TIMESTAMP(3),
    "created_at"         TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_article_comment_pkey" PRIMARY KEY ("article_comment_id")
);

-- CreateTable
CREATE TABLE "blog.article_comment_content"
(
    "article_comment_content_id" UUID         NOT NULL,
    "article_comment_id"         UUID         NOT NULL,
    "created_at"                 TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text"                       TEXT         NOT NULL,

    CONSTRAINT "blog_article_comment_content_pkey" PRIMARY KEY ("article_comment_content_id")
);

-- CreateTable
CREATE TABLE "blog.article_rating"
(
    "article_id" UUID         NOT NULL,
    "user_id"    UUID         NOT NULL,
    "rating"     INTEGER      NOT NULL,
    "ip_address" TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_article_rating_pkey" PRIMARY KEY ("article_id", "user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_username_key" ON "user.user" ("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_email_key" ON "user.user" ("email");

-- AddForeignKey
ALTER TABLE "blog.article"
    ADD CONSTRAINT "blog_article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user.user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog.article_content"
    ADD CONSTRAINT "blog_article_content_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "blog.article" ("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog.article_comment"
    ADD CONSTRAINT "blog_article_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user.user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog.article_comment"
    ADD CONSTRAINT "blog_article_comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "blog.article" ("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog.article_comment_content"
    ADD CONSTRAINT "blog_article_comment_content_article_comment_id_fkey" FOREIGN KEY ("article_comment_id") REFERENCES "blog.article_comment" ("article_comment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog.article_rating"
    ADD CONSTRAINT "blog_article_rating_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "blog.article" ("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog.article_rating"
    ADD CONSTRAINT "blog_article_rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user.user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed Data
INSERT INTO "user.user" (user_id, username, first_name, last_name, password_hash, email, email_verified,
                         active, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'username',
        'John',
        'Doe',
        '$2a$10$TX6hFKdH6ya1HxDBPnalZujKQ3uLy57Oeb0qO2O3Ndnxv3uKu6lgy',
        'john.doe@example.com',
        TRUE,
        TRUE,
        NOW());

INSERT INTO "blog.article" (article_id, user_id, is_public, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        TRUE,
        NOW());

INSERT INTO "blog.article_content" (article_content_id, article_id, title, perex, text, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'My First Article',
        'This is a short introduction to my first article.',
        'This is the main content of my first article.',
        NOW());

INSERT INTO "blog.article_comment" (article_comment_id, user_id, article_id, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        NOW());

INSERT INTO "blog.article_comment_content" (article_comment_content_id, article_comment_id, text, created_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'Great article!',
        NOW());

INSERT INTO "blog.article_rating" (article_id, user_id, rating, ip_address, created_at, updated_at)
VALUES ('ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        'ee04dc69-b206-49f0-af72-d7bb3afe8a33',
        1,
        '192.168.0.1',
        NOW(),
        NOW());
