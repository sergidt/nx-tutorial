import { inject } from '@angular/core';
import { CustomerDTO } from '@my-project/shared-models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { removeAllEntities, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe } from 'rxjs';
import { CustomerManagementService } from '../infrastructure/customer-management.service';

export const CustomersStore = signalStore(
  withEntities<CustomerDTO>(),

  withMethods((store,
      _customersService = inject(CustomerManagementService))=> ({
      filterCustomers: rxMethod<Partial<CustomerDTO>>(
        pipe(
          exhaustMap((filter: Partial<CustomerDTO>) => _customersService.filterCustomers(filter)
                                                                        .pipe(
                                                                          tapResponse({
                                                                            next: (customers: CustomerDTO[]) => {
                                                                              patchState(store, setEntities(customers));
                                                                            },
                                                                            error: (error) => {
                                                                              console.error('Failed to filter customers', error);
                                                                              patchState(store, removeAllEntities());
                                                                            }
                                                                          })
                                                                        )
          )
        )
      )
    })
  ),

  withHooks({
    onInit: (store) => store.filterCustomers({})
  })
);
