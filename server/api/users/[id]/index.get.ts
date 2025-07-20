import { Type } from '@sinclair/typebox';
import { db } from '~~/server/utils/db';
import { UserResourceDto } from '~~/shared/schemas';

export default defineApi({
  params: Type.Object({
    id: Type.String()
  }),
  response: UserResourceDto
}, async (event) => {
  const user = await db.user.findUnique({
    where: {
      id: event.routerParams.id,
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      tel: true,
      avatar: true,
      lastActiveAt: true,
      roles: true
    },
  });

  if (!user) throw notFound('User not found');
  return user;
});
