import { ShoppingListItem } from ".prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { ShoppingList } from "@prisma/client";
import { IsNotEmpty, MaxLength, MinLength, ValidateNested, IsString, IsNumber, IsPositive } from "class-validator";
import { IsBoolean } from "class-validator/types/decorator/decorators";

export class CreateShoppingListItemDto implements Omit<ShoppingListItem, 'id' | 'createdAt' | 'updatedAt'> {
    @IsNotEmpty() @MaxLength(20) @MinLength(2) @IsString() @ApiProperty({ description: 'Item name e.g Milo'})
    name: string;
    
    @IsNotEmpty() @IsNumber() @IsPositive() @ApiProperty({ description: 'Quantity of item(Milo) you want to purchase' })
    quantity: number;
    
    @IsNotEmpty() @IsNumber() @IsPositive() @ApiProperty({ description: 'Price of the item(Milo)' })
    price: number;
    
    @IsNotEmpty() @IsNumber() @IsPositive() @ApiProperty({ description: 'Total price of Item purchased => totalPrice = price * quantity' })
    totalPrice: number;
    
    @IsNotEmpty() @IsNumber() @IsPositive() @ApiProperty({ description: 'The Shopping List it Belongs to' })
    shoppingListId: number;
    
    @IsNotEmpty() @IsBoolean() @ApiProperty({ description: 'The Shopping List it Belongs to' })
    checked: boolean;
}

export class CreateShoppingListDto implements Omit<ShoppingList, 'id' | 'createdAt' | 'updatedAt'> {
    @IsNotEmpty() @MaxLength(20) @MinLength(2) @IsString() @ApiProperty({ description: 'List name e.g Jan 1 Shopping List'})
    name: string;

    @IsNotEmpty() @IsNumber() @IsPositive() @ApiProperty({ description: 'Total Price of items in the list' })
    totalPrice: number;
    
    @IsNotEmpty() @ValidateNested() @ApiProperty({ description: 'Shopping List Item' })
    items: CreateShoppingListItemDto[]
}
