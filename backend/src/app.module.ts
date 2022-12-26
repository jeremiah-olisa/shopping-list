import { Module } from '@nestjs/common';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@Module({
  imports: [ShoppingListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
