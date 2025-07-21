import { Type, type Static } from '@sinclair/typebox';
import { PaginateQuery } from './paginate';
import { Nullable } from './null';
import { CategoryDto } from './category';

export const DeviceKindQuery = PaginateQuery(
  Type.Object({
    categoryId: Type.Optional(Type.Number()),
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
  coverImageUrl: Type.String({ format: 'uri' }),
  galleryImageUrls: Type.Array(Type.String({ format: 'uri' })),
  quantity: Type.Number(),
  borrowableQuantity: Type.Number(),
  category: Nullable(CategoryDto),
  description: Nullable(Type.String()),
});
export type DeviceKindDto = Static<typeof DeviceKindDto>;

export const LabDeviceQuantityDto = Type.Object({
  id: Type.String(),
  name: Type.String(),
  branch: Type.String(),
  room: Type.String(),
  borrowableQuantity: Type.Number(),
});
export type LabDeviceQuantityDto = Static<typeof LabDeviceQuantityDto>;