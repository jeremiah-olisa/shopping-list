import { InitialiseClient } from "./../../src/prisma/prisma.client"
import shoppingListSeeder from "./shopping-list.seeder";

async function main() {
    /* Initialising the Prisma Client. */
    InitialiseClient();

    const results = await prisma.$transaction(async (prismaClient) => {
        return {
            shoppingList: await shoppingListSeeder(prismaClient)
        }

    })

    console.log({ ...results })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })