import { createPaginator } from 'prisma-extension-pagination';
import { PrismaClient } from '../db/prisma/client';

const paginate = createPaginator({
  pages: { includePageCount: true },
});
export const db = new PrismaClient().$extends({
  name: 'pagination',
  model: {
    $allModels: {
      paginate,
    },
  },
});