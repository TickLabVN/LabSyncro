import { Type } from '@sinclair/typebox';
import { CreateDeviceDto } from '~~/shared/schemas/device';

export default defineApi({
  body: Type.Array(CreateDeviceDto),
  response: Type.Object({
    count: Type.Number(),
  }),
}, async (event) => {
  return db.device.createMany({
    data: event.body.map((device) => ({
      deviceKindId: device.kindId,
      labId: device.labId,
    })),
  });
});
