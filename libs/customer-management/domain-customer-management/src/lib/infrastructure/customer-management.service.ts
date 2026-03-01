import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomerDTO } from '@my-project/shared-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {
  httpClient = inject(HttpClient);

  filterCustomers(filter: Partial<CustomerDTO> = {}): Observable<CustomerDTO[]> {
    return this.httpClient.get<CustomerDTO[]>('http://localhost:3000/api/customers/filter',
      { params: filter as Record<string, string>, responseType: 'json' }
    );
  }

  getCustomers(): Observable<CustomerDTO[]> {
    return this.httpClient.get<CustomerDTO[]>('http://localhost:3000/api/customers', { responseType: 'json' });
  }
}
