import { Type } from '@sinclair/typebox';
import { LabDto } from '~~/shared/schemas/lab';
import type { JWT } from 'next-auth/jwt';

export default defineApi({
  query: Type.Object({ search: Type.Optional(Type.String()), adminId: Type.Optional(Type.String()) }),
  response: Type.Array(LabDto),
}, async (event) => {
  const token = event.context.auth as JWT;
  const adminId = event.query.adminId === 'me' ? token.sub : event.query.adminId;
  const labs = await db.lab.findMany({
    select: {
      id: true,
      branch: true,
      room: true,
      timetable: true,
      admin: { select: { id: true, name: true, email: true, tel: true } },
      name: true,
    },
    where: {
      adminId,
      name: event.query.search ? { contains: event.query.search, mode: 'insensitive' } : undefined,
      deletedAt: null,
    }
  });
  return labs.map((lab) => ({
    id: lab.id,
    branch: lab.branch,
    room: lab.room,
    name: lab.name,
    timetable: lab.timetable as Record<string, string[]>,
    admin: lab.admin
  }));
});

