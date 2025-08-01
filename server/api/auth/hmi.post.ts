import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { CreateHmiDto, HmiTokenDto } from '~~/shared/schemas/hmi';

const { JWT_SECRET } = useRuntimeConfig();

export default defineApi({
  body: CreateHmiDto,
  response: HmiTokenDto,
  roles: ['LAB_ADMIN', 'SYSTEM_ADMIN']
}, async (event) => {
  const id = randomUUID();
  const hmiToken = jwt.sign(
    { id },
    JWT_SECRET,
    { expiresIn: event.body.expiresIn }
  );
  const hmi = await db.hmi.create({
    data: {
      id,
      labId: event.body.labId,
      token: hmiToken,
    },
    select: { id: true }
  });

  return {
    id: hmi.id,
    token: hmiToken
  };
}); 