import { Test } from '@nestjs/testing';
import { CustomerManagementService } from './customer-management.service';

describe('CustomerManagementService', () => {
  let service: CustomerManagementService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CustomerManagementService],
    }).compile();

    service = app.get<CustomerManagementService>(CustomerManagementService);
  });


  describe('getCustomers', () => {
    it('should return an array of customers', () => {
      const customers = service.getCustomers();
      expect(Array.isArray(customers)).toBe(true);
    });

    it('should return 13 customers', () => {
      const customers = service.getCustomers();
      expect(customers.length).toBe(13);
    });

    it('should return customers with required fields', () => {
      const customers = service.getCustomers();
      customers.forEach((customer) => {
        expect(customer).toHaveProperty('id');
        expect(customer).toHaveProperty('name');
        expect(customer).toHaveProperty('email');
        expect(customer).toHaveProperty('phone');
        expect(customer).toHaveProperty('address');
        expect(customer).toHaveProperty('postalCode');
      });
    });

    it('should return customers with unique ids', () => {
      const customers = service.getCustomers();
      const ids = customers.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(customers.length);
    });

    it('should return the first customer as John Doe', () => {
      const customers = service.getCustomers();
      expect(customers[0]).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        postalCode: '12345',
      });
    });
  });

  describe('filterCustomers', () => {
    it('should return all customers when filter is empty', () => {
      const result = service.filterCustomers({});
      expect(result.length).toBe(13);
    });

    it('should filter by exact name', () => {
      const result = service.filterCustomers({ name: 'John Doe' });
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('John Doe');
    });

    it('should filter by partial name (case-insensitive)', () => {
      const result = service.filterCustomers({ name: 'john' });
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('John Doe');
    });

    it('should filter by email', () => {
      const result = service.filterCustomers({ email: 'jane.smith@example.com' });
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Jane Smith');
    });

    it('should filter by partial postalCode', () => {
      const result = service.filterCustomers({ postalCode: '98765' });
      expect(result.length).toBe(2);
    });

    it('should filter by multiple fields', () => {
      const result = service.filterCustomers({ name: 'Laura', postalCode: '10987' });
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Laura Garcia');
    });

    it('should return empty array when no customers match', () => {
      const result = service.filterCustomers({ name: 'Nobody' });
      expect(result).toEqual([]);
    });
  });
});
