// import * as db from 'zapatos/db';
import { db } from '~/server/db';
import type { UserResourceDto } from '~/shared/schemas';

export default defineEventHandler<Promise<UserResourceDto[]>>(async (event) => {
  await requirePermission(event, '/settings/users:own');

  const users = await db.user.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      email: true,
      tel: true,
      avatar: true,
      lastActiveAt: true,
      roles: true,
    },
    orderBy: { lastActiveAt: 'desc' },
  });

  return users;
}); 
