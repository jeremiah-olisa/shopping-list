import { Injectable } from '@nestjs/common';
import { CreateShoppingListDto, CreateShoppingListItemDto } from './dto/create.dto';
import { UpdateShoppingListDto, UpdateShoppingListItemDto } from './dto/update.dto';
import { PrismaService } from './../prisma/prisma.service';
import ApiQueryBuilder from 'prisma-api-query-builder/dist/query-builder';
import { IQueryFields } from 'prisma-api-query-builder/types';
import { Prisma } from '@prisma/client';
import { ShoppingListEntity } from './entities/shopping-list.entity';

@Injectable()
export class ShoppingListService {
  constructor(private prisma: PrismaService) {
  }
  create(createShoppingListDto: CreateShoppingListDto) {
    const { items, ...dto } = createShoppingListDto;

    return this.prisma.shoppingList.create({
      data: {
        ...dto,
        items: {
          create: items
        }
      }
    });
  }

  async findAll(query?: IQueryFields) {
    return new ApiQueryBuilder<ShoppingListEntity>(this.prisma.shoppingList, new ShoppingListEntity, query)
      .all()
      .build()
      .many();
  }

  findOne(id: number, query?: IQueryFields) {
    return new ApiQueryBuilder<ShoppingListEntity, Prisma.ShoppingListFindFirstArgs>(this.prisma.shoppingList, new ShoppingListEntity, query)
      .select()
      .populate()
      .build()
      .one({ where: { id } });
  }

  update(id: number, updateShoppingListDto: UpdateShoppingListDto) {
    return this.prisma.shoppingList.update({
      where: { id },
      data: updateShoppingListDto
    });
  }

  remove(id: number) {
    return this.prisma.shoppingList.delete({
      where: { id },
      select: { id: true }
    });
  }

  removeItem(id: number) {
    return this.prisma.shoppingListItem.delete({
      where: { id },
      select: { id: true }
    });
  }

  updateItem(id: number, updateShoppingListItemDto: UpdateShoppingListItemDto) {
    return this.prisma.shoppingListItem.update({
      where: { id },
      data: updateShoppingListItemDto
    });
  }

  addItem(createShoppingListItemDto: CreateShoppingListItemDto) {
    return this.prisma.shoppingListItem.create({
      data: createShoppingListItemDto
    });
  }
}
