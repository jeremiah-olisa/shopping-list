import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { CreateShoppingListDto } from './dto/create.dto';
import { UpdateShoppingListDto } from './dto/update.dto';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  create(@Body() createShoppingListDto: CreateShoppingListDto) {
    return this.shoppingListService.create(createShoppingListDto);
  }

  @Get()
  findAll() {
    return this.shoppingListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.shoppingListService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateShoppingListDto: UpdateShoppingListDto) {
    return this.shoppingListService.update(id, updateShoppingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.shoppingListService.remove(id);
  }
}
