import { Component, forwardRef, Input, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  @Input() rating: number;

  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity(): number {
    return this.disabled ? 0.25 : 1;
  }

  constructor() {}

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  onChange = (_rating: number) => {};

  onTouched = () => {};

  writeValue(rating: number): void {
    this.rating = rating;
    this.onChange(rating);
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ratingClicked(rating: number): void {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
