import { Type } from '@sinclair/typebox';
import { CategoryDto } from '~~/shared/schemas/category';

export default defineApi({
  response: Type.Array(CategoryDto),
}, (async () => {
  return db.category.findMany({
    select: { id: true, name: true },
  });
}));
