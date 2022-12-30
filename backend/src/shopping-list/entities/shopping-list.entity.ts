import { IModelEntity, TableColumns } from "prisma-api-query-builder/types";
import { ShoppingList, Prisma, ShoppingListItem } from "@prisma/client"
import { TableRelationShips } from "prisma-api-query-builder/types/prisma-query.type";

export type Columns = TableColumns<ShoppingList>;

export type RelationShips = TableRelationShips<Prisma.ShoppingListCreateInput, ShoppingList>;

const allColumns: Columns[] = ['id', 'name', 'createdAt', 'updatedAt']
export class ShoppingListEntity implements IModelEntity<ShoppingList, Columns, RelationShips> {
    id: number;
    name: string;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    
    filterableColumns: Columns[] = allColumns;
    selectableColumns: Columns[] = allColumns;
    filterableReltionship: RelationShips[] = ['items'];
    filterableReltionshipColumns: TableColumns<ShoppingListItem>[] = ['name', 'price', 'checked', 'quantity'];
    sortableColumns: Columns[] = ['createdAt', 'name'];
    allowedRelationShips: RelationShips[] = ['items'];
    selectableRelationShips: { [x in RelationShips]: string[]; } = {
        items: ['price', 'name', 'quantity', 'checked'] as TableColumns<ShoppingListItem>[]
    };

}
