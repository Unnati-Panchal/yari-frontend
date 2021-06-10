import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IProductDetail } from '@yaari/models/admin/admin.interface';

@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.scss'],
})
export class ProductSpecificationComponent implements OnInit {
  form: FormGroup;
  specifications: any[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      sleeve_length: new FormControl(''),
      size_chart: new FormControl(''),
      color_chart: new FormControl(''),
      neck_pattern: new FormControl(''),
      kurti_length: new FormControl(''),
      hemline: new FormControl(''),
    });
  }

  public bindProduct(product: IProductDetail) {
    if (!product) {
      return;
    }

    for (const [key, value] of Object.entries(product.specifications)) {
      this.specifications.push({ key: key, value: value });
    }
  }

  ngOnInit(): void {}
}