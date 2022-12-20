import { CancelNotification } from '@app/services/cancel-notification';
import { CountRecipientNotifications } from '@app/services/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/services/get-recipient-notifications';
import { ReadNotification } from '@app/services/read-notification';
import { SendNotification } from '@app/services/send-notification';
import { UnreadNotification } from '@app/services/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private cancelNotification: CancelNotification,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('get/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }
}
