import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SearchBar } from '@my-project/search-bar';
import { CustomerDTO } from '@my-project/shared-models';

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
  customers: CustomerDTO[] = [
  ];

  filteredCustomers = computed(() => {
    const filter = this.filter();
    return this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(filter.toLowerCase()),
    );
  });

  applyFilter(filter: string) {
    this.filter.set(filter);
  }
}
