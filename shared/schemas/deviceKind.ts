import { Type, type Static } from '@sinclair/typebox';
import { PaginateQuery } from './paginate';
import { Nullable } from './null';
import { CategoryDto } from './category';

export const DeviceKindQuery = PaginateQuery(
  Type.Object({
    categoryId: Type.Optional(Type.Number()),
    labId: Type.Optional(Type.String()),
    search: Type.Optional(Type.String()),
  }),
);
export type DeviceKindQuery = Static<typeof DeviceKindQuery>;

export const DeviceKindDto = Type.Object({
  id: Type.String(),
  name: Type.String(),
  unit: Nullable(Type.String()),
  brand: Nullable(Type.String()),
  manufacturer: Nullable(Type.String()),
  mainImage: Type.String(),
  subImages: Type.Array(Type.String()),
  quantity: Type.Number(),
  borrowableQuantity: Type.Number(),
  category: Nullable(CategoryDto),
  description: Nullable(Type.String()),
});
export type DeviceKindDto = Static<typeof DeviceKindDto>;