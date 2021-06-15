import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAdminSelectors from '~store/admin/admin.selectors';
import {AppFacade, IAppState} from '~store/app.state';
import {AdminService} from '@yaari/services/admin/admin.service';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-view-product-catalogue',
  templateUrl: './view-product-catalogue.component.html',
  styleUrls: ['./view-product-catalogue.component.scss']
})
export class ViewProductCatalogueComponent implements OnInit {
  @Input() selectedTabIndex = 0;

  specifications: any[] = [];


  getCategoryProductDetail$ = this._store.pipe(select(fromAdminSelectors.getCategoryProductDetail$), filter(value => !!value));
  private _subscription: Subscription = new Subscription();

  constructor(
    private _store: Store<IAppState>,
    private _adminService: AdminService,
    private _appFacade: AppFacade,
  ) {
  }

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('category_management');
    this._subscription.add(
      this.getCategoryProductDetail$.subscribe((data) => {
        this.bindProduct(data.specifications);
      })
    );
  }

  selectedIndexChange(index: number): void {
    this.selectedTabIndex = index;
  }

  public bindProduct(specifications) {
    for (const [key, value] of Object.entries(specifications)) {
      this.specifications.push({key: key, value: value});
    }
  }

}
