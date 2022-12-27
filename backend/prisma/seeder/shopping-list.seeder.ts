import { Prisma, ShoppingList } from "@prisma/client";
import { CreateShoppingListDto, CreateShoppingListNestedItemDto } from "./../../src/shopping-list/dto/create.dto";
import { faker } from '@faker-js/faker';


const generateShoppingItem = (items: number = faker.datatype.number({ max: 15, min: 1 })) => {
    const lists: CreateShoppingListNestedItemDto[] = []

    for (let i = 0; i < items; i++) {
        lists.push({
            checked: faker.datatype.boolean(),
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            quantity: faker.datatype.number({ max: 15, min: 1 }),
        })
    }
    return lists
}

const ShoppingListSeeder = async (prismaClient: Prisma.TransactionClient) => {

    const { items }: Pick<CreateShoppingListDto, 'items'> = {
        items: generateShoppingItem()
    }

    console.log({ items })

    const dto: Omit<CreateShoppingListDto, 'items'> = {
        name: `${faker.name.fullName()}'s Cart`,
    }

    return prismaClient.shoppingList.create({
        data: {
            ...dto,
            items: {
                create: items
            }
        }
    });
}

const shoppingListSeeder = async (prismaClient: Prisma.TransactionClient, listCount: number = faker.datatype.number({ max: 30, min: 1 })) => {
    const lists: ShoppingList[] = []

    for (let i = 0; i < listCount; i++) {
        lists.push(await ShoppingListSeeder(prismaClient))
    }

    return lists;
}

export default shoppingListSeeder;