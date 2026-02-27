import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'customer-management/customer-list',
    pathMatch: 'full',
  },
  {
    path: 'customer-management',
    children: [
    {
      path: 'customer-list',
      loadChildren: () =>
        import('@my-project/feature-customer-management').then(
          (m) => m.Routes
        ),
    }
    ]
  }
];
