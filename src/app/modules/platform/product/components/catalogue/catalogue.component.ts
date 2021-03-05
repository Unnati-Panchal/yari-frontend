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

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public selectedFile: File;
  success: string;
  selectedCategory: {id: string, name: string, terminal: boolean};
  selectedCategoryMsg: string;
  categoriesChain: {name: string, isLast: boolean}[];
  downloadLoading: boolean;
  uploadLoading: boolean;
  isDisabledDownloadBtn = true;
  public uploadForm: FormGroup;

  public getCategories$ = this._store.pipe(select(fromProductsSelectors.getCategories), filter(cat => !!cat));
  public bulkUploadCatalog$ = this._store.pipe(select(fromProductsSelectors.bulkUploadCatalog), filter(b => !!b));
  public getIsError$ = this._store.pipe(
    select(fromProductsSelectors.getIsError),
    tap( () => {
      this.uploadLoading = false;
      this.downloadLoading = false;
    }));

  constructor(private _store: Store<IAppState>,
              private _product: ProductsService,
              private _formBuilder: FormBuilder,
              private _appFacade: AppFacade
  ) {
  }

  ngOnInit(): void {
    this._store.dispatch(fromProductsActions.getCategories({categoryId: ''}));
    this._subscription.add(this.bulkUploadCatalog$.subscribe(() => {
      this.success = `Successfully uploaded file`;
      this.uploadLoading = false;
      this._appFacade.clearMessages();
      this.uploadForm.reset();
      this.categoriesChain = [];
      this._store.dispatch(fromProductsActions.getCategories({categoryId: ''}));
    }));

    this.uploadForm = this._formBuilder.group({
      catalogue_name: ['', [Validators.required]]
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  downloadTemplate(): void {
    if (this.isDisabledDownloadBtn) {
      this.selectedCategoryMsg = 'Please select a subcategory';
      return;
    }
    this.downloadLoading = true;
    this._subscription.add(
      this._product.getBulkBasicUploadTemplate().subscribe(response => {
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
      this.success = `Please enter your catalogue name`;
      return;
    }
    const fileUpload = {
      file: this.selectedFile,
      category_id: this.selectedCategory?.id,
      catalogue_name: this.uploadForm?.value?.catalogue_name
    };
    this.uploadLoading = true;
    if (!fileUpload?.file) {
      this.success = `Please upload file`;
      this.uploadLoading = false;
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
      this.selectedFile = item;
    }
    if (this.selectedFile) {
      if (!this.selectedFile?.name.includes('xlsx')) {
        this.success = `Please upload xlsx files only`;
      } else {
        this.success = `Successfully added file ${this.selectedFile.name}. Click Upload`;
      }
    } else {
      this.success = `Please try again`;
    }
  }

  public isSelectedCategory(category: {id: string, name: string, terminal: boolean}): void {
    if (!this.categoriesChain?.length) {
      this.categoriesChain = [{name: category.name, isLast: category.terminal}];
    } else {
      this.categoriesChain.push({name: category.name, isLast: category.terminal});
    }

    if (!category?.terminal) {
      const categoryId = category.id;
      this._store.dispatch(fromProductsActions.getCategories({categoryId}));
      this.selectedCategoryMsg = 'Please select a subcategory';
      this.isDisabledDownloadBtn = true;
    } else {
      this.selectedCategoryMsg = '';
      this.isDisabledDownloadBtn = false;
    }
  }

}
