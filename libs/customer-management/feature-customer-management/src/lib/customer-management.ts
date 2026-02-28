import { ChangeDetectionStrategy, Component, computed, signal, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SearchBar } from '@my-project/search-bar';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
}

@Component({
  selector: 'lib-customer-management',
  imports: [MatTableModule, SearchBar],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerManagement {
  filter = signal('');

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'address',
    'postalCode',
  ];
  customers: Customer[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      postalCode: '12345',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      address: '456 Elm St, Othertown, USA',
      postalCode: '67890',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '555-555-5555',
      address: '789 Oak St, Sometown, USA',
      postalCode: '54321',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      phone: '444-444-4444',
      address: '101 Pine St, Newtown, USA',
      postalCode: '98765',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      phone: '333-333-3333',
      address: '202 Maple St, Oldtown, USA',
      postalCode: '87654',
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '222-222-2222',
      address: '303 Cedar St, Smalltown, USA',
      postalCode: '76543',
    },
    {
      id: 7,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      phone: '111-111-1111',
      address: '404 Birch St, Largetown, USA',
      postalCode: '65432',
    },
    {
      id: 8,
      name: 'Sarah Miller',
      email: 'sarah.miller@example.com',
      phone: '999-999-9999',
      address: '505 Spruce St, Middletown, USA',
      postalCode: '54321',
    },
    {
      id: 9,
      name: 'Michael Anderson',
      email: 'michael.anderson@example.com',
      phone: '888-888-8888',
      address: '606 Walnut St, Anothertown, USA',
      postalCode: '43210',
    },
    {
      id: 10,
      name: 'Jessica Taylor',
      email: 'jessica.taylor@example.com',
      phone: '777-777-7777',
      address: '707 Cherry St, Newcity, USA',
      postalCode: '32109',
    },
    {
      id: 11,
      name: 'Daniel Martinez',
      email: 'daniel.martinez@example.com',
      phone: '666-666-6666',
      address: '808 Pine St, Oldcity, USA',
      postalCode: '21098',
    },
    {
      id: 12,
      name: 'Laura Garcia',
      email: 'laura.garcia@example.com',
      phone: '555-555-5555',
      address: '909 Oak St, Smalltown, USA',
      postalCode: '10987',
    },
    {
      id: 13,
      name: 'Kevin Lee',
      email: 'kevin.lee@example.com',
      phone: '444-444-4444',
      address: '101 Birch St, Newtown, USA',
      postalCode: '98765',
    },
  ];

  filteredCustomers = computed(() => {
    const filter = this.filter();
    return this.customers.filter(customer => customer.name.toLowerCase().includes(filter.toLowerCase()));
  })


  applyFilter(filter: string) {
    this.filter.set(filter);
  }
}
