import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { CreateShoppingListDto } from './dto/create.dto';
import { UpdateShoppingListDto } from './dto/update.dto';
import { QueryFields } from 'src/query-decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('shopping-list')
@ApiTags('ShoppingList')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) { }

  @Post()
  create(@Body() createShoppingListDto: CreateShoppingListDto) {
    return this.shoppingListService.create(createShoppingListDto);
  }

  @Get()
  findAll(@Query() query: QueryFields) {
    return this.shoppingListService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query() query: QueryFields) {
    return this.shoppingListService.findOne(id, query);
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
