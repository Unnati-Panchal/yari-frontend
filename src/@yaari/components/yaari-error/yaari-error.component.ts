import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

export interface IErrors {
  loc?: string[];
  msg?: string;
}

@Component({
  selector: 'app-error-success',
  templateUrl: './yaari-error.component.html',
  styleUrls: ['./yaari-error.component.scss']
})
export class ErrorSuccessComponent implements OnChanges {
  @Input() errors: any;
  @Input() success: string;
  public errorArray: IErrors[];
  public singleError: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.errors || this.errors || this.success) {
      this.errorArray = [];
      this.singleError = null;
      if (this.errors?.error?.detail && Array.isArray(this.errors?.error?.detail)) {
        this.errorArray = this.errors.error.detail;
      }
      if (this.errors?.error?.detail && typeof this.errors?.error?.detail === 'string') {
        this.singleError = this.errors?.error?.detail;
      }
      if (this.errors?.detail && Array.isArray(this.errors?.detail)) {
        this.errorArray = this.errors.detail;
      }
      if (this.errors?.detail && typeof this.errors?.detail === 'string') {
        this.singleError = this.errors?.detail;
      }
    }
  }

}
