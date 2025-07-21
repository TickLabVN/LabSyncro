import { Type } from '@sinclair/typebox';

export default defineApi({
  params: Type.Object({ id: Type.String() }),
  response: Type.String(),
}, async (event) => {
  await db.device.update({
    where: { id: event.routerParams.id },
    data: { printedAt: new Date() },
  });
  return event.routerParams.id;
});