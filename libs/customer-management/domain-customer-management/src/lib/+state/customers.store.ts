import { inject } from '@angular/core';
import { CustomerDTO } from '@my-project/shared-models';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, watchState, withHooks, withMethods } from '@ngrx/signals';
import {
  removeAllEntities,
  setAllEntities,
  setEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe } from 'rxjs';
import { CustomerManagementService } from '../infrastructure/customer-management.service';

export const CustomersStore = signalStore(
  withEntities<CustomerDTO>(),

  withMethods(
    (store, _customersService = inject(CustomerManagementService)) => ({
      getCustomers: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            _customersService.getCustomers().pipe(
              tapResponse({
                next: (customers: CustomerDTO[]) => {
                  patchState(store, setAllEntities(customers));
                },
                error: (error) => {
                  console.error('Failed to load customers', error);
                  patchState(store, removeAllEntities());
                },
              }),
            ),
          ),
        ),
      ),

      filterCustomers: rxMethod<Partial<CustomerDTO>>(
        pipe(
          exhaustMap((filter: Partial<CustomerDTO>) =>
            _customersService.filterCustomers(filter).pipe(
              tapResponse({
                next: (customers: CustomerDTO[]) => {
                  patchState(store, setAllEntities(customers));
                },
                error: (error) => {
                  console.error('Failed to filter customers', error);
                  patchState(store, removeAllEntities());
                },
              }),
            ),
          ),
        ),
      ),
    }),
  ),

  withHooks({
    onInit: (store) => {
      store.filterCustomers({});

      /*
      watchState(store, (state) => {
        console.log('[watchState]', state);
      });

       */
    },
  }),
);
