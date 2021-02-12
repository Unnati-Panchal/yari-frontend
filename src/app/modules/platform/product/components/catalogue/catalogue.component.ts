import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromProductsActions from '~store/products/products.actions';
import {Store} from '@ngrx/store';
import {IAppState} from '~store/app.state';
import {Subscription} from 'rxjs';
import {ProductsService} from '@yaari/services/products/products.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public selectedFile: File;
  uploadedFile: string;

  constructor(private _store: Store<IAppState>, private _product: ProductsService) {
  }

  ngOnInit(): void {
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
      sub_category_id: 7
    };
    this._store.dispatch(fromProductsActions.bulkUploadCatalog({fileUpload}));
    this.uploadedFile = `Successfully uploaded`;
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
      this.uploadedFile = `Successfully added file ${this.selectedFile.name}. Click Upload`;
    } else {
      this.uploadedFile = `Try again`;
    }
  }

}
