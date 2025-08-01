import { getToken } from '#auth';
import type { H3Event } from 'h3';
import { forbidden } from './errors';
import type { UserRole } from '../db/prisma/client';

export async function requireRoles(event: H3Event, roles: UserRole | UserRole[]) {
  const token = await getToken({ event });
  const userPermissions = token?.permissions as string[] || [];

  const hasPermission = Array.isArray(roles)
    ? roles.every(p => userPermissions.includes(p))
    : userPermissions.includes(roles);

  if (!hasPermission) throw forbidden();
} 