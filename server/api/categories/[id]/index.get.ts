import { Type } from '@sinclair/typebox';
import { CategoryDto } from '~~/shared/schemas/category';

export default defineApi({
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: CategoryDto
}, async (event) => {

  return db.category.findUniqueOrThrow({
    select: { name: true, id: true },
    where: { id: event.routerParams.id },
  });
});
