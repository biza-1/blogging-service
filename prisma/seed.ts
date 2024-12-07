import { PrismaClient } from '@prisma/client';
import { LOG_CONTEXT } from '../src/common/constants';

const prisma = new PrismaClient();

async function main() {
    // Create a user
    const user = await prisma.userUser.create({
        data: {
            username: 'username',
            firstName: 'John',
            lastName: 'Doe',
            passwordHash: Buffer.from('$2a$10$TX6hFKdH6ya1HxDBPnalZujKQ3uLy57Oeb0qO2O3Ndnxv3uKu6lgy'), // password === "string"
            email: 'john.doe@example.com',
            emailVerified: true,
            active: true,
            createdAt: new Date(),
        },
    });

    console.log(LOG_CONTEXT.PRISMA_SEED, 'Created user: ', user);

    // Create a blog article
    const article = await prisma.blogArticle.create({
        data: {
            userId: user.userId,
            isPublic: true,
            createdAt: new Date(),
            content: {
                create: [
                    {
                        title: 'My First Article',
                        perex: 'This is a short introduction to my first article.',
                        text: 'This is the main content of my first article.',
                        createdAt: new Date(),
                    },
                ],
            },
        },
    });

    console.log(LOG_CONTEXT.PRISMA_SEED, 'Created article: ', article);

    // Add a comment to the article
    const comment = await prisma.blogArticleComment.create({
        data: {
            userId: user.userId,
            articleId: article.articleId,
            createdAt: new Date(),
            content: {
                create: [
                    {
                        text: 'Great article!',
                        createdAt: new Date(),
                    },
                ],
            },
        },
    });

    console.log(LOG_CONTEXT.PRISMA_SEED, 'Created comment: ', comment);

    // Rate the article
    const rating = await prisma.blogArticleRating.create({
        data: {
            articleId: article.articleId,
            userId: user.userId,
            rating: 1,
            ipAddress: '192.168.0.1',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    console.log(LOG_CONTEXT.PRISMA_SEED, 'Created rating: ', rating);
}

main()
    .catch(e => {
        console.error(LOG_CONTEXT.PRISMA_SEED, e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
