import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { NOT_FOUND_CODE } from '~/server/constants';
import { db } from '~/server/db';
import type { UserResourceDto } from '~/shared/schemas';

export default defineEventHandler<Promise<UserResourceDto>>(async (event) => {
  await requirePermission(event, ['/admin/borrows/form:edit', '/admin/returns/form:edit']);
  const userId = Value.Convert(Type.String(), getRouterParam(event, 'id')) as string;
  const user = await db.user.findUnique({
    where: {
      id: userId,
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

  if (!user) {
    throw createError({
      statusCode: NOT_FOUND_CODE,
      message: 'User not found!',
    });
  }

  return user;
});
