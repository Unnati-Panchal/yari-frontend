import * as fromAdminActions from '~store/admin/admin.actions';
import * as fromRouter from '~store/route/route.selectors';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ICatalogueContentManagement, ICatalogueProducts, IUploadedCatalogue } from '@yaari/models/admin/admin.interface';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AdminService } from '@yaari/services/admin/admin.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class AdminEffects {
  public getUploadedCatalogues$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getUploadedCatalogues),
      map(action => action),
      switchMap(() =>
        this._adminService.getUploadedCatalogues().pipe(
          map((uploadedCatalogues: IUploadedCatalogue[]) => fromAdminActions.getUploadedCataloguesSuccess({ uploadedCatalogues })),
          catchError(error => of(fromAdminActions.getUploadedCataloguesError(error)))
        )
      )
    )
  );

  public getCatalogueContentManagements$ = createEffect(() =>
  this._actions$.pipe(
    ofType(fromAdminActions.getCatalogueContentManagements),

    map(action => action),
    switchMap(() =>
      this._adminService.getCatalogContents().pipe(

        // tslint:disable-next-line: max-line-length
        map((cataloguesContentManagements: ICatalogueContentManagement[]) => fromAdminActions.getCatalogueContentManagementsSuccess({ cataloguesContentManagements })),
        catchError(error => of(fromAdminActions.getCatalogueContentManagementsError(error)))
      )
    )
  )
);



public getCatalogueProductList$ = createEffect(() =>
this._actions$.pipe(
  ofType(fromAdminActions.getCatalogueProductList),
  map(action => action.catalogueIds),
  switchMap((catalogueIds: string) =>
    this._adminService.getCatalogProductList(catalogueIds).pipe(
      // tslint:disable-next-line: max-line-length
      map((catalogueProductLists: ICatalogueContentManagement[]) => fromAdminActions.getCatalogueProductListSuccess({ catalogueProductLists })),
      catchError(error => of(fromAdminActions.getCatalogueProductListError(error)))
    )
  )
)
);


  // public getCatalogueDownload$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(fromAdminActions.getCatalogueDownload),
  //     map(action => action.catalogueId),
  //     switchMap((catalogueId: number) =>
  //       this._adminService.getCatalogueDownload(catalogueId).pipe(
  //         map((catalogueExcel: Blob) => fromAdminActions.getCatalogueDownloadSuccess({ catalogueExcel })),
  //         catchError(error => of(fromAdminActions.getCatalogueDownloadError(error)))
  //       )
  //     )
  //   )
  // );

  public getCatalogueProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getCatalogueProducts),
      map(action => action.catalogueId),
      switchMap((catalogueId: number) =>
        this._adminService.getCatalogueProducts(catalogueId).pipe(
          map((catalogueProducts: ICatalogueProducts[]) => fromAdminActions.getCatalogueProductsSuccess({ catalogueProducts })),
          catchError(error => of(fromAdminActions.getCatalogueProductsError(error)))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _adminService: AdminService,
    private _store: Store<fromRouter.IRouterState>) { }

}
