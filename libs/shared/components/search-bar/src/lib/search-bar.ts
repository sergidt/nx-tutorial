import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject, output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'search-bar',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    FormsModule,
    MatIconButton,
    MatIcon,
  ],
  template: `
    <mat-form-field>
      <mat-label>Filter</mat-label>
      <input #filter matInput type="text" />
      @if (filter.value.length > 0) {
        <button
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="clearSearch()"
        >
          <mat-icon>close</mat-icon>
        </button>
      }
    </mat-form-field>
  `,
  styles: `
    :host {
      mat-form-field {
        width: 300px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar implements AfterViewInit {
  readonly #destroyRef = inject(DestroyRef);
  protected  readonly filter = viewChild.required<ElementRef>('filter');
  filterChanged = output<string>();



  value = signal('');

  ngAfterViewInit() {
    const inputEl = this.filter().nativeElement as HTMLInputElement;

    fromEvent<KeyboardEvent>(inputEl, 'keyup')
      .pipe(
        filter((e: KeyboardEvent) => e.code === 'Enter'),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe(() => this.filterChanged.emit(inputEl.value));
  }

  /**
   * Clears the search input and emits an empty string to indicate
   * that the filter has been cleared.
   */
  clearSearch() {
    this.filter().nativeElement.value = '';
    this.filterChanged.emit('');
  }
}
