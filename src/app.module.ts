import { Module } from '@nestjs/common';
import { DbModule } from './infra/db/db.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule, DbModule],
})
export class AppModule {}
