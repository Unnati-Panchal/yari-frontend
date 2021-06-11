import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IProductDetail } from '@yaari/models/admin/admin.interface';
import data from '../../models/catalogue-edit.mock.json';

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
    });
  }

  bindProduct(product: IProductDetail) {
    if (!product) {
      return;
    }

    for (const [key, value] of Object.entries(product.specifications)) {
      this.specifications.push({ key: key, value: value });
       this.form.addControl(key,new FormControl(value))
    }


    
 
    // this.form.setValue({
    //   id: product.id,
    //   sleeve_length: product.sleeve_length,
    //   size_chart: product.size_chart,
    //   color_chart: product.color_chart,
    //   neck_pattern: product.neck_pattern,
    //   kurti_length: product.kurti_length,
    //   hemline: product.hemline
    // });
  }

  ngOnInit(): void {}
}
