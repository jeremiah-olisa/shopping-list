import { Injectable } from '@nestjs/common';
import { CreateShoppingListDto } from './dto/create.dto';
import { UpdateShoppingListDto } from './dto/update.dto';

@Injectable()
export class ShoppingListService {
  create(createShoppingListDto: CreateShoppingListDto) {
    return 'This action adds a new shoppingList';
  }

  findAll() {
    return `This action returns all shoppingList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingList`;
  }

  update(id: number, updateShoppingListDto: UpdateShoppingListDto) {
    return `This action updates a #${id} shoppingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingList`;
  }
}
