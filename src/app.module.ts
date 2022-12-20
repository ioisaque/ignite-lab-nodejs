import { DbModule } from '@infra/db/db.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, DbModule],
})
export class AppModule {}
