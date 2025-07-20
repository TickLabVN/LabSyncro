import { Type } from '@sinclair/typebox';

export default defineApi({
  query: Type.Object({
    ids: Type.Array(Type.String()),
  }),
  response: Type.Object({ count: Type.Number() }),
}, async (event) => {
  return db.deviceKind.updateMany({
    where: { id: { in: event.query.ids }, },
    data: { deletedAt: new Date() }
  });
});
