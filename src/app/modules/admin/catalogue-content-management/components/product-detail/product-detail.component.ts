import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { IProductCategory } from '@yaari/models/admin/admin.interface';
import data from '../../models/catalogue-edit.mock.json';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) {
    this.createForm();
    this.getProductCategories();
    this.bindProduct(1);
  }


  form: FormGroup;
  productCategories: IProductCategory[] = [];
  video: any;
  private images = [];
  private defaultImage = 'assets/images/yaari-logo.png';

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('fileInputVideo', { static: false }) fileInputVideo: ElementRef;

  ngOnInit(): void { }

  public uploadFileEvt(imgFile: any): void {

    if (imgFile.target.files && imgFile.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
        };
        this.images.push(image);
      };

      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    }
  }

  public uploadFile(event: any): void {
    const file = event.target.files[0];
    const URL = window.URL;
    this.video = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  public getImages(id: number): string {

    const image = this.images[id];
    if (image) {
      return image.src;
    }
    return this.defaultImage;
  }

  public deleteImage(id: number): void {
    const image = this.images[id];
    if (image) {

      this.images.splice(id, 1);
    }
  }

  public deleteVideo(): void {
    this.video = null;
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      product_name: new FormControl(''),
      product_sku_id: new FormControl(''),
      product_description: new FormControl(''),
      product_category: new FormControl(''),
      material_care: new FormControl(''),
      mrp: new FormControl(''),
      final_selling_price: new FormControl(''),
      stock_count: new FormControl(''),
      re_stock_date: new FormControl(''),
      manufacturing_date: new FormControl(''),
      country_of_origin: new FormControl(''),
      key_feature: new FormControl(''),
      offer: new FormControl(''),
      offer_start_date: new FormControl(''),
      offer_end_date: new FormControl(''),
      guarantee: new FormControl(''),
      warranty: new FormControl(''),
      images: new FormControl(''),
      videos: new FormControl(''),
    });
  }

  private getProductCategories(): void {
    this.productCategories.push({
      id: 1, name: 'Women\'s wear'
    });

    this.productCategories.push({
      id: 2, name: 'Men\'s wear'
    });

    this.productCategories.push({
      id: 3, name: 'Mercedes'
    });

    this.productCategories.push({
      id: 4, name: 'Audi'
    });
  }

  private bindProduct(id: number): void {
    const product = data.find(f => f.id === id);
    if (!product) {
      return;
    }
    this.form.setValue({
      id: product.id,
      product_name: product.product_name,
      product_sku_id: product.product_sku_id,
      product_description: product.product_description,
      product_category: product.product_category,
      material_care: product.material_care,
      mrp: product.mrp,
      final_selling_price: product.final_selling_price,
      stock_count: product.stock_count,
      re_stock_date: product.re_stock_date,
      manufacturing_date: product.manufacturing_date,
      country_of_origin: product.country_of_origin,
      key_feature: product.key_feature,
      offer: product.offer,
      offer_start_date: product.offer_start_date,
      offer_end_date: product.offer_end_date,
      guarantee: product.guarantee,
      warranty: product.warranty,
      images: product.images,
      videos: product.videos,
    });
  }
}