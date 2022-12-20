import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { randomUUID } from 'crypto';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );
    const recipientId = randomUUID();

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientId }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientId }),
    );

    await notificationsRepository.create(makeNotification());

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientId }),
        expect.objectContaining({ recipientId: recipientId }),
      ]),
    );
  });
});
