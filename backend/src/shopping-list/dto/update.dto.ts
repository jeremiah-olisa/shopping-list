import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateShoppingListDto, CreateShoppingListItemDto } from './create.dto';

export class UpdateShoppingListDto extends PartialType(OmitType(CreateShoppingListDto, ['items'])) { }

export class UpdateShoppingListItemDto extends PartialType(CreateShoppingListItemDto) { }
