import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SearchBar } from '@my-project/search-bar';
import {CustomersStore} from "@my-project/domain-customer-management";

@Component({
  selector: 'lib-customer-management',
  imports: [MatTableModule, SearchBar],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.scss',
  providers: [CustomersStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerManagement {
  protected store = inject(CustomersStore);

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'address',
    'postalCode',
  ];

  applyFilter(filter: string) {
    this.store.filterCustomers({ name: filter });
  }
}
