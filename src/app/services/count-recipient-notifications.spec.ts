import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications';
import { randomUUID } from 'crypto';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it('should be able to count notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: recipientId,
    });

    expect(count).toEqual(2);
    expect(notificationsRepository.notifications.length).toEqual(3);
  });
});
