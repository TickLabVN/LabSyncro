import { Type } from '@sinclair/typebox';
import { UserDto } from '~~/shared/schemas';

export default defineApi({
  response: Type.Array(UserDto),
  roles: ['SYSTEM_ADMIN', 'LAB_ADMIN']
}, async () => {
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
