import { CancelNotification } from '@app/services/cancel-notification';
import { CountRecipientNotifications } from '@app/services/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/services/get-recipient-notifications';
import { ReadNotification } from '@app/services/read-notification';
import { SendNotification } from '@app/services/send-notification';
import { UnreadNotification } from '@app/services/unread-notification';
import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DbModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
