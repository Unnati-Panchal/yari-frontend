import * as fromAdminActions from '~store/admin/admin.actions';
import * as fromAdminSelectors from '~store/admin/admin.selectors';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';

import { IAppState } from '~store/app.state';
import { ISupplierDetails } from '@yaari/models/admin/admin.interface';
import { Location } from '@angular/common';
import { downloadFile } from '@yaari/utils/utlis';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public KAMSupplierDetails$ = this._store.pipe(select(fromAdminSelectors.KAMSupplierDetails$), filter(list => !!list));
  public isError$ = this._store.pipe(select(fromAdminSelectors.getIsError), filter(err => !!err));
  loading: boolean;
  KAMSupplierDetails: ISupplierDetails;
  isKYCDetailsSelected = false;

  constructor(private _store: Store<IAppState>, private router: Router, private route: ActivatedRoute, private _location: Location) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    const supplierId = this.route.snapshot.paramMap.get('id');
    this._store.dispatch(fromAdminActions.getSupplierDetailsById({ supplierId: Number(supplierId) }));
    this.getCatalogList();
  }

  public backBtn(): void {
    this._location.back();
  }

  getCatalogList(): void {
    this._subscription.add(
      combineLatest([this.KAMSupplierDetails$])
        .subscribe(([KAMSupplierDetails]) => {
          this.loading = false;
          this.KAMSupplierDetails = KAMSupplierDetails;
        })
    );
  }

  downloadImage(url: string): void {
    downloadFile(url).then();
  }

}
