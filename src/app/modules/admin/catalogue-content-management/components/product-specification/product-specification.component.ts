import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import data from '../../models/catalogue-edit.mock.json';
 

@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.scss']
})
export class ProductSpecificationComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder) { 
    this.createForm();
    this.bindProduct(1);
  }

  private createForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      sleeve_length: new FormControl(''),
      size_chart: new FormControl(''),
      color_chart: new FormControl(''),
      neck_pattern: new FormControl(''),
      kurti_length: new FormControl(''),
      hemline: new FormControl('')
    });
  }

  private bindProduct(id: number) {
    const product = data.find(f => f.id === id);
    if (!product) {
      return;
    }
    this.form.setValue({
      id: product.id,
      sleeve_length: product.sleeve_length,
      size_chart: product.size_chart,
      color_chart: product.color_chart,
      neck_pattern: product.neck_pattern,
      kurti_length: product.kurti_length,
      hemline: product.hemline
    });
  }

  ngOnInit(): void {
  }

}
