import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerManagementService } from './customer-management.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CustomerManagementService],
})
export class AppModule {}
