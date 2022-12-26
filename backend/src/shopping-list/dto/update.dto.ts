import { PartialType } from '@nestjs/swagger';
import { CreateShoppingListDto } from './create.dto';

export class UpdateShoppingListDto extends PartialType(CreateShoppingListDto) {}
