import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { CustomerManagementService } from './customer-management.service';
import { CustomerDTO } from '@my-project/shared-models';

const mockCustomers: CustomerDTO[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St, Anytown, USA', postalCode: '12345' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Oak Ave, Somewhere, USA', postalCode: '98765' },
];

describe('AppController', () => {
  let controller: AppController;
  let service: CustomerManagementService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [CustomerManagementService],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<CustomerManagementService>(CustomerManagementService);
  });

  describe('getCustomers', () => {
    it('should return the full customers list', () => {
      jest.spyOn(service, 'getCustomers').mockReturnValue(mockCustomers);
      expect(controller.getCustomers()).toEqual(mockCustomers);
    });

    it('should call service.getCustomers once', () => {
      const spy = jest.spyOn(service, 'getCustomers').mockReturnValue(mockCustomers);
      controller.getCustomers();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('filterCustomers', () => {
    it('should return filtered customers by name', () => {
      const filtered = [mockCustomers[0]];
      jest.spyOn(service, 'filterCustomers').mockReturnValue(filtered);
      expect(controller.filterCustomers({ name: 'John' })).toEqual(filtered);
    });

    it('should call service.filterCustomers with the provided filter', () => {
      const spy = jest.spyOn(service, 'filterCustomers').mockReturnValue([]);
      controller.filterCustomers({ postalCode: '12345' });
      expect(spy).toHaveBeenCalledWith({ postalCode: '12345' });
    });

    it('should return empty array when no customers match', () => {
      jest.spyOn(service, 'filterCustomers').mockReturnValue([]);
      expect(controller.filterCustomers({ name: 'Nobody' })).toEqual([]);
    });
  });
});
