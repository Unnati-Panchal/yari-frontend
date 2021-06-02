import * as fromAdminActions from '~store/admin/admin.actions';
import * as fromRouter from '~store/route/route.selectors';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ICatalogueContentManagement, ICatalogueProducts, IEditProduct, IProductDetail, IUploadedCatalogue } from '@yaari/models/admin/admin.interface';
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


  public getProductDetail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getProductDetail),
      map(action => action.productId),
      switchMap((productId: number) =>
        this._adminService.getProductDetail(productId).pipe(
          map((productDetail: IProductDetail) => fromAdminActions.getProductDetailSuccess({ productDetail })),
          catchError(error => of(fromAdminActions.getProductDetailError(error)))
        )
      )
    )
  );

  public editProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.editProduct),
      map(action => action.product),
      switchMap((product: IEditProduct) =>
        this._adminService.editProduct(product).pipe(
          map((product: IEditProduct) => fromAdminActions.editProductSuccess({ product })),
          catchError(error => of(fromAdminActions.editProductError(error)))
        )
      )
    )
  );


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
