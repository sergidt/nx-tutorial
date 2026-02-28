import { Controller, Get, Query } from '@nestjs/common';
import { CustomerManagementService } from './customer-management.service';
import { CustomerDTO } from '@my-project/shared-models';

@Controller()
export class AppController {
  constructor(private readonly appService: CustomerManagementService) {}

  @Get('customers')
  getCustomers() {
    return this.appService.getCustomers();
  }

  @Get('customers/filter')
  filterCustomers(@Query() filter: Partial<CustomerDTO>) {
    return this.appService.filterCustomers(filter);
  }
}
