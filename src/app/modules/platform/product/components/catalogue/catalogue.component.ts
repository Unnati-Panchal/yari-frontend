import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {AppFacade, IAppState} from '~store/app.state';
import {Subscription} from 'rxjs';
import {ProductsService} from '@yaari/services/products/products.service';
import * as fileSaver from 'file-saver';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '@yaari/models/product/product.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public selectedFile: File;
  public selectedImagesZipFile: File;
  downloadLoading: boolean;
  isDisabledDownloadBtn = true;
  public selectedCategory: {id: string, name: string, terminal: boolean};
  public uploadForm: FormGroup;
  public categories: ICategory[];
  public subCategories1: ICategory[];
  public subCategories2: ICategory[];
  public subCategories3: ICategory[];
  public subCategories4: ICategory[];

  public categories$ = this._store.pipe(select(fromProductsSelectors.getCategories), filter(cat => !!cat));
  public bulkUploadCatalog$ = this._store.pipe(select(fromProductsSelectors.bulkUploadCatalog), filter(b => !!b));
  public getIsError$ = this._store.pipe(
    select(fromProductsSelectors.getIsError),
    tap( () => this.downloadLoading = false));

  public categoryForm: FormGroup;

  constructor(private _store: Store<IAppState>,
              private _product: ProductsService,
              private _formBuilder: FormBuilder,
              private _appFacade: AppFacade,
              private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this._store.dispatch(fromProductsActions.getCategories({categoryId: ''}));
    this._subscription.add(this.bulkUploadCatalog$.subscribe((uploaded) => {
      const msg = `Catalogue uploaded successfully. It’ll be done on or before: ${moment(uploaded.time_estimate).format('YYYY-MM-DD HH:mm')}h. To view the status, please check "Catalogue status" menu in Dashboard.`;
      this._snackBar.open(msg, 'X', {duration: 10000});

      this._appFacade.clearMessages();
      this.uploadForm.reset();
      this.categories = [];
      this.subCategories1 = [];
      this.subCategories2 = [];
      this.subCategories3 = [];
      this.subCategories4 = [];
      this._store.dispatch(fromProductsActions.getCategories({categoryId: ''}));
    }));

    this.uploadForm = this._formBuilder.group({
      catalogue_name: ['', [Validators.required]]
    });

    this.categorySelection();
  }

  public categorySelection(): void {
    this._subscription.add(
      this.categories$.subscribe( (categories) => {
        if (!this.categories?.length) {
          this.categories = categories;
        } else if (!this.subCategories1?.length) {
          this.subCategories1 = categories;
        } else if (!this.subCategories2?.length) {
          this.subCategories2 = categories;
        } else if (!this.subCategories3?.length) {
          this.subCategories3 = categories;
        } else if (!this.subCategories4?.length) {
          this.subCategories4 = categories;
        }
      })
    );

    this.categoryForm = this._formBuilder.group({
      category: ['', [Validators.required]],
      subCategory1: [''],
      subCategory2: [''],
      subCategory3: [''],
      subCategory4: ['']
    });

    this._subscription.add(
      this.categoryForm.get('category').valueChanges.subscribe( category => {
        this.categoryForm.get('subCategory1').setValue('', {emitEvent: false});
        this.categoryForm.get('subCategory2').setValue('', {emitEvent: false});
        this.categoryForm.get('subCategory3').setValue('', {emitEvent: false});
        this.categoryForm.get('subCategory4').setValue('', {emitEvent: false});
        this.subCategories1 = [];
        this.subCategories2 = [];
        this.subCategories3 = [];
        this.subCategories4 = [];
        this.isSelectedCategory(category);
      })
    );
    this._subscription.add(
      this.categoryForm.get('subCategory1').valueChanges.subscribe( category => {
        this.categoryForm.get('subCategory2').setValue('', {emitEvent: false});
        this.categoryForm.get('subCategory3').setValue('', {emitEvent: false});
        this.categoryForm.get('subCategory4').setValue('', {emitEvent: false});
        this.subCategories2 = [];
        this.subCategories3 = [];
        this.subCategories4 = [];
        this.isSelectedCategory(category);
      })
    );
    this._subscription.add(
      this.categoryForm.get('subCategory2').valueChanges.subscribe( category => {
        this.categoryForm.get('subCategory3').setValue('', {emitEvent: false});
        this.categoryForm.get('subCategory4').setValue('', {emitEvent: false});
        this.subCategories3 = [];
        this.subCategories4 = [];
        this.isSelectedCategory(category);
      })
    );
    this._subscription.add(
      this.categoryForm.get('subCategory3').valueChanges.subscribe( category => {
        this.categoryForm.get('subCategory4').setValue('', {emitEvent: false});
        this.subCategories4 = [];
        this.isSelectedCategory(category);
      })
    );
    this._subscription.add(
      this.categoryForm.get('subCategory4').valueChanges.subscribe( category => {
        this.isSelectedCategory(category);
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  downloadTemplate(): void {
    if (this.isDisabledDownloadBtn) {
      this.openSnackBar(`Please select a sub-category`);
      return;
    }
    this.downloadLoading = true;
    this._subscription.add(
      this._product.getBulkBasicUploadTemplate(Number(this.selectedCategory?.id)).subscribe(response => {
        this.downloadLoading = false;
        const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        fileSaver.saveAs(blob, 'product_upload_template.xlsx');
      }, () => {
        this.downloadLoading = false;
      })
    );
  }

  upload(): void {
    this.uploadForm.updateValueAndValidity();
    if (!this.uploadForm?.value?.catalogue_name) {
      this.openSnackBar(`Please enter your catalogue name`);
      return;
    }
    if (!this.subCategories1?.length) {
      this.openSnackBar(`Please select a sub-category`);
      return;
    }
    const fileUpload = {
      file: this.selectedFile,
      category_id: this.selectedCategory?.id,
      catalogue_name: this.uploadForm?.value?.catalogue_name,
      images_zipfile: this.selectedImagesZipFile
    };
    if (!fileUpload?.file) {
      this.openSnackBar(`Please upload file`);
      return;
    }
    this._store.dispatch(fromProductsActions.bulkUploadCatalog({fileUpload}));
  }

  onFileDropped($event): void {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files): void {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>): void {
    this._appFacade.clearMessages();
    for (const item of files) {
      if (item?.name.includes('.xlsx')) {
        this.selectedFile = item;
      } else if (item?.name.includes('.zip')) {
        this.selectedImagesZipFile = item;
      } else {
        this.openSnackBar(`Please upload '.xlsx' or '.zip' files only`);
      }
    }
    if (this.selectedFile) {
      const msg = `Successfully added file ${this.selectedFile.name}. Click Upload`;
      this.openSnackBar(msg);
    } else {
      this.openSnackBar(`Please try again`);
    }
    if (this.selectedImagesZipFile) {
      const msg = `Successfully added file ${this.selectedImagesZipFile.name}. Click Upload`;
      this.openSnackBar(msg);
    }
  }

  public isSelectedCategory(category: {id: string, name: string, terminal: boolean}): void {
    if (!category?.terminal) {
      const categoryId = category.id;
      this._store.dispatch(fromProductsActions.getCategories({categoryId}));
      this.openSnackBar(`Please select a sub-category`);
      this.isDisabledDownloadBtn = true;
    } else {
      this.selectedCategory = category;
      this.isDisabledDownloadBtn = false;
    }
  }

  openSnackBar(msg): void {
    this._snackBar.open(msg, 'X', {duration: 5000});
  }

}
