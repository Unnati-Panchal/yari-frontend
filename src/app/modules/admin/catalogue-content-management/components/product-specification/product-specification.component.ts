import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IProductDetail} from '@yaari/models/admin/admin.interface';

@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.scss'],
})
export class ProductSpecificationComponent implements OnInit {
  form: FormGroup;
  specifications: any[] = [];

  constructor(private fb: FormBuilder) {

  }

  private createForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
    });
  }

  trackByKey = (index: number, obj: object): string => {
    // @ts-ignore
    return obj.key;
  };

  bindProduct(product: IProductDetail) {
    this.createForm();
    this.specifications = [];
    if (!product) {
      return;
    }
    for (const [key, value] of Object.entries(product.specifications)) {
      if (key !== 'id') {
        this.specifications.push({key: key, value: value});
        this.form.addControl(key, new FormControl(value));
      }
    }

  }

  ngOnInit(): void {
    this.createForm();
  }
}
