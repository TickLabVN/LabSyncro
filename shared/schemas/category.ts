import { Type, type Static } from '@sinclair/typebox';

export const CategoryDto = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
});
export type CategoryDto = Static<typeof CategoryDto>;
