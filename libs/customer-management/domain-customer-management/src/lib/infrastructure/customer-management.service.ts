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
    return this.httpClient.post<CustomerDTO[]>('http://localhost:3000/customers/filter', filter,
      { responseType: 'json' }
    );
  }
}
