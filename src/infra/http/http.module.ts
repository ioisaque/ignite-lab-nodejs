import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/services/send-notification';
import { DbModule } from '../db/db.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DbModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
