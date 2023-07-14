import prisma from "./client";

async function main() {
    const user = await prisma.user.create({
        data: {
            email: "test123@gmail.com",
            name: "test123",
            address: "Tel aviv, Israel, 123456",
            posts: {
                create: {
                    title: "titleee",
                    body: "bodyyy",
                }
            },
        }
    });

    console.log(user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1);
    })