import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromProductsActions from '~store/products/products.actions';
import {select, Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {Subscription} from 'rxjs';
import {ProductsService} from '@yaari/services/products/products.service';
import * as fileSaver from 'file-saver';
import * as fromProductsSelectors from '~store/products/products.selectors';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public selectedFile: File;
  uploadedFile: string;
  selectedCategory: {id: string, name: string, terminal: boolean};
  selectedCategoryMsg: string;

  public getCategories$ = this._store.pipe(select(fromProductsSelectors.getCategories), filter(cat => !!cat));
  public bulkUploadCatalog$ = this._store.pipe(select(fromProductsSelectors.bulkUploadCatalog), filter(b => !!b));
  public getIsError$ = this._store.pipe(select(fromProductsSelectors.getIsError), filter(err => !!err));

  constructor(private _store: Store<IAppState>, private _product: ProductsService) {
  }

  ngOnInit(): void {
    this._store.dispatch(fromProductsActions.getCategories({categoryId: ''}));
    this._subscription.add(this.bulkUploadCatalog$.subscribe(() => this.uploadedFile = `Successfully uploaded`));
    this._subscription.add(this.getIsError$.subscribe((error: any) => {
      if (error.detail[0]?.loc.find(msg => msg === 'category_id') && error.detail[0]?.msg === 'field required') {
        this.uploadedFile = 'Category field is required!';
      }
    }));
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  downloadTemplate(): void {
    this._subscription.add(
      this._product.getBulkBasicUploadTemplate().subscribe(response => {
        const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        fileSaver.saveAs(blob, 'product_upload_template.xlsx');
      })
    );
  }

  upload(): void {
    const fileUpload = {
      file: this.selectedFile,
      category_id: this.selectedCategory?.id
    };
    this._store.dispatch(fromProductsActions.bulkUploadCatalog({fileUpload}));
  }

  onFileDropped($event): void {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files): void {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>): void {
    for (const item of files) {
      this.selectedFile = item;
    }
    if (this.selectedFile) {
      if (!this.selectedFile?.name.includes('xlsx')) {
        this.uploadedFile = `Please upload xlsx files only`;
      } else {
        this.uploadedFile = `Successfully added file ${this.selectedFile.name}. Click Upload`;
      }
    } else {
      this.uploadedFile = `Try again`;
    }
  }

  public isSelectedCategory(category: {id: string, name: string, terminal: boolean}): void {
    if (!category?.terminal) {
      const categoryId = category.id;
      this._store.dispatch(fromProductsActions.getCategories({categoryId}));
      this.selectedCategoryMsg = 'Please select a subcategory';
    } else {
      this.selectedCategoryMsg = '';
    }
  }

}
