import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';
import { randomUUID } from 'crypto';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'example',
    recipientId: randomUUID(),
    content: new Content('Base notification.'),
    ...override,
  });
}
