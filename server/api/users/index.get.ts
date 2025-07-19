// import * as db from 'zapatos/db';
import type { UserResourceDto } from '~/lib/api_schema';
import { db } from '~/server/db';

export default defineEventHandler<Promise<UserResourceDto[]>>(async (event) => {
  await requirePermission(event, '/settings/users:own');

  const users = await db.user.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      email: true,
      tel: true,
      image: true,
      lastActiveAt: true,
      roles: true,
    },
    orderBy: {
      lastActiveAt: {
        sort: 'desc',
        nulls: 'last',
      },
    },
  });

  return users;
}); 
