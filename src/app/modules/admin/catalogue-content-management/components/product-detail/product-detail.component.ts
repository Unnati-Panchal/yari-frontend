import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IProductDetail} from '@yaari/models/admin/admin.interface';

import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  selectedProductId: number;
  form: FormGroup;
  newVideo: { src?: any, data?: string, file?: any, name?: string } = {};

  newImages: { src: string, file?: any, name?: string, newlyUploaded: boolean }[] = [];
  deletedImages: { src: string, file?: any, name?: string }[] = [];

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('fileInputVideo', { static: false }) fileInputVideo: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit(): void { }

  uploadFileEvt(imgFile: any): void {

    if (imgFile.target.files && imgFile.target.files[0]) {
      const file: File = imgFile.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.newImages.push({
          src: reader.result as string,
          name: file.name,
          newlyUploaded: true,
          file
        });
      };
      reader.readAsDataURL(file);
      this.fileInput.nativeElement.value = '';
    }
  }

  uploadFile(event: any): void {
    const file = event.target.files[0];
    const URL = window.URL;
    this.newVideo.src = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = () => {
      this.newVideo.file = file;
      this.newVideo.data = reader.result as string;
      this.newVideo.name = file.name;
      console.log(this.newVideo);
    };
    reader.readAsDataURL(file);
  }

  fileInputClick(event): boolean {
    const maxImageCount = 5;
    if (this.newImages.length >= maxImageCount) {
      this._snackBar.open(
        `Please remove at least one Image before uploading new one. \n Maximum ${maxImageCount} Images can be uploaded.`,
        '',
        {duration: 3000}
      );
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    return true;
  }

  getImages(id: number): string {
    const image = this.newImages[id];
    if (image) {
      return image.src;
    }
  }

  deleteImage(id: number): void {
    const image = this.newImages[id];
    if (image) {

      this.deletedImages.push(image);
      this.newImages.splice(id, 1);
    }
  }

  deleteVideo(): void {
    this.newVideo = null;
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
      videos: new FormControl(''),
      discount: new FormControl(''),
      hsnCode: new FormControl(''),
      productId: new FormControl(''),
      groupId: new FormControl(''),
    });
  }

  bindProduct(product: IProductDetail): void {
    if (!product) {
      return;
    }
    this.form.setValue({
      id: product.id,
      product_name: product.product_name,
      product_sku_id: product.sku_id,
      product_description: product.description,
      product_category: product.product_catalog.category.name,
      material_care: product.material_care,
      mrp: product.mrp,
      final_selling_price: product.sp,
      stock_count: product.inventory,
      re_stock_date: product.re_stock_date,
      manufacturing_date: product.manufacturing_date,
      country_of_origin: product.country_of_origin,
      key_feature: product.key_features,
      offer: product.offers,
      offer_start_date: product.discount_start_date,
      offer_end_date: product.discount_end_date,
      guarantee: product.guarantee,
      warranty: product.warranty,
      videos: product.video_url,
      discount: product.discount,
      hsnCode: product.hsn_code,
      productId: product.product_id,
      groupId: product.group_id,
    });
    this.newImages = [];
    product.product_img.forEach(e => {
      this.newImages.push({
        src: e.url,
        newlyUploaded: false
      });
    });
  }
}
