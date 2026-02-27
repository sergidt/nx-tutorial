import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-customer-management',
  imports: [],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerManagement {}
