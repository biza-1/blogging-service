import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create a user
    const user = await prisma.userUser.create({
        data: {
            username: 'username',
            firstName: 'John',
            lastName: 'Doe',
            passwordSalt: Buffer.from('$2a$10$Q0har2PsuDPQoojMec6kSO'),
            passwordHash: Buffer.from('$2a$10$Q0har2PsuDPQoojMec6kSOZUu.x9lGt8NLmwMgGuPM4V0LUrKdNRC'), // password is string
            email: 'john.doe@example.com',
            emailVerified: true,
            active: true,
            createdAt: new Date(),
        },
    });

    console.log('Created user: ', user);

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

    console.log('Created article: ', article);

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

    console.log('Created comment: ', comment);

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

    console.log('Created rating: ', rating);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
