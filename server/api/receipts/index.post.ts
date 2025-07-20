import { Type, type Static } from '@sinclair/typebox';
import type { JWT } from 'next-auth/jwt';
import { db } from '~~/server/utils/db';

const BodyDto = Type.Object({
  receiptId: Type.Optional(Type.String()),
  deviceIds: Type.Array(Type.String()),
  borrowerId: Type.String(),
  borrowDate: Type.Date(),
  borrowLabId: Type.String(),
  expectedReturnDate: Type.Date(),
  expectedReturnLabId: Type.String(),
});

type BodyDto = Static<typeof BodyDto>;

export default defineApi({
  body: BodyDto,
  roles: ['LAB_ADMIN'],
}, async (event) => {
  const { deviceIds, borrowerId, borrowDate, borrowLabId, expectedReturnDate, expectedReturnLabId } = event.body;
  if (expectedReturnDate < borrowDate) throw badRequest('Expected return date must be after borrow date');
  const auth = event.context.auth as JWT;

  const isLabAdmin = await db.user.count({
    where: { id: auth.sub }
  });
  if (!isLabAdmin) throw forbidden('You are not lab admin');

  const hasUnhealthyDevices = await db.device.count({
    where: {
      id: { in: deviceIds },
      status: { not: 'HEALTHY' },
    },
  });
  if (hasUnhealthyDevices > 0) throw badRequest('Only healthy devices can be borrowed');

  await
    // FIXME: Need to investigate the driver to see if we should retry on serialization error
    await db.serializable(dbPool, async (dbClient) => {
      const [{ id: receiptId }] = await db.sql`
      INSERT INTO ${'receipts'} (id, borrower_id, borrowed_lab_id, borrow_checker_id)
      VALUES (${_receiptId ? db.param(_receiptId) : db.Default}, ${db.param(borrowerId)}, ${db.param(borrowLabId)}, ${db.param(checkerId)})
      RETURNING id;
    `.run(dbClient);

      await db.sql`
      INSERT INTO ${'receipts_devices'} (receipt_id, device_id, borrow_id, expected_returned_at, expected_returned_lab_id)
      SELECT ${db.param(receiptId)}, id, ${db.param(activityId)}, ${db.param(expectedReturnDate)}, ${db.param(expectedReturnLabId)}
      FROM unnest(${db.param(deviceIds)}::TEXT[]) as devices(id);
    `.run(dbClient);

      await db.sql`
      UPDATE ${'devices'}
      SET status = 'borrowing'
      WHERE ${'id'} = ANY(${db.param(deviceIds)})
    `.run(dbClient);
    });
});
