import * as fromAdminActions from '~store/admin/admin.actions';
import * as fromRouter from '~store/route/route.selectors';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  ICatalog,
  ICatalogueContentManagement,
  ICatalogueManagementCountFilter,
  ICatalogueProducts,
  IComplaints,
  IEditProduct,
  IFilter,
  IMsgResponse,
  IProductDetail,
  ISupplierDetails,
  ISupplierList,
  ISupplierOnboard,
  IUploadedCatalogue
} from '@yaari/models/admin/admin.interface';
import {catchError, map, switchMap} from 'rxjs/operators';

import {AdminService} from '@yaari/services/admin/admin.service';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';

@Injectable()
export class AdminEffects {
  public getUploadedCatalogues$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getUploadedCatalogues),
      map(action => action),
      switchMap(() =>
        this._adminService.getUploadedCatalogues().pipe(
          map((uploadedCatalogues: IUploadedCatalogue[]) => fromAdminActions.getUploadedCataloguesSuccess({uploadedCatalogues})),
          catchError(error => of(fromAdminActions.getUploadedCataloguesError(error)))
        )
      )
    )
  );

  public getCatalogueContentManagements$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getCatalogueContentManagements),

      map(action => action.filter),
      switchMap((filter: IFilter) =>
        this._adminService.getCatalogContents(filter).pipe(
          // tslint:disable-next-line: max-line-length
          map((cataloguesContentManagements: ICatalogueContentManagement[]) => fromAdminActions.getCatalogueContentManagementsSuccess({cataloguesContentManagements})),
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
          map((catalogueProductLists: ICatalogueContentManagement[]) => fromAdminActions.getCatalogueProductListSuccess({catalogueProductLists})),
          catchError(error => of(fromAdminActions.getCatalogueProductListError(error)))
        )
      )
    )
  );


  public getProductDetail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getProductDetails),
      map(action => action.productIds),
      switchMap((productIds: string) =>
        this._adminService.getProductDetail(productIds).pipe(
          map((productDetails: IProductDetail[]) => fromAdminActions.getProductDetailsSuccess({productDetails})),
          catchError(error => of(fromAdminActions.getProductDetailsError(error)))
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
          map((product: IEditProduct) => fromAdminActions.editProductSuccess({product})),
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
          map((catalogueProducts: ICatalogueProducts[]) => fromAdminActions.getCatalogueProductsSuccess({catalogueProducts})),
          catchError(error => of(fromAdminActions.getCatalogueProductsError(error)))
        )
      )
    )
  );

  public getSupplierList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getSupplierList),
      map(action => action.filter),
      switchMap((filter: IFilter) =>
        this._adminService.getSupplierList(filter).pipe(
          map((KAMSupplierList: ISupplierList[]) => fromAdminActions.getSupplierListSuccess({KAMSupplierList})),
          catchError(error => of(fromAdminActions.getSupplierListError(error)))
        )
      )
    )
  );

  public getSupplierDetailsById$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getSupplierDetailsById),
      map(action => action.supplierId),
      switchMap((supplierId: number) =>
        this._adminService.getSupplierDetailsById(supplierId).pipe(
          map((KAMSupplierDetails: ISupplierDetails) => fromAdminActions.getSupplierDetailsByIdSuccess({KAMSupplierDetails})),
          catchError(error => of(fromAdminActions.getSupplierDetailsByIdError(error)))
        )
      )
    )
  );

  public getCatalogList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getCatalogList),
      map(action => action.filter),
      switchMap((filter: IFilter) =>
        this._adminService.getCatalogList(filter).pipe(
          map((KAMCatalogList: ICatalog[]) => fromAdminActions.getCatalogListSuccess({KAMCatalogList})),
          catchError(error => of(fromAdminActions.getCatalogListError(error)))
        )
      )
    )
  );

  public getProductsByCatalogId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getProductsByCatalogId),
      map(action => action.catalogId),
      switchMap((catalogId: number) =>
        this._adminService.getProductsByCatalogId(catalogId).pipe(
          map((KAMProductDetails: IProductDetail[]) => fromAdminActions.getProductsByCatalogIdSuccess({KAMProductDetails})),
          catchError(error => of(fromAdminActions.getProductsByCatalogIdError(error)))
        )
      )
    )
  );

  public getSupplierOnBoardings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getSupplierOnBoardings),
      map(action => action.filter),
      switchMap((filter: IFilter) =>
        this._adminService.getSupplierOnBoardings(filter).pipe(
          map((KAMSupplierOnboardings: ISupplierDetails[]) => fromAdminActions.getSupplierOnBoardingsSuccess({KAMSupplierOnboardings})),
          catchError(error => of(fromAdminActions.getSupplierOnBoardingsError(error)))
        )
      )
    )
  );

  public approveRejectSupplier$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.approveRejectSupplier),
      map(action => action.supplier),
      switchMap((supplier: ISupplierOnboard) =>
        this._adminService.approveRejectSupplier(supplier).pipe(
          map((KAMApprovedResponse: IMsgResponse) => fromAdminActions.approveRejectSupplierSuccess({KAMApprovedResponse})),
          catchError(error => of(fromAdminActions.approveRejectSupplierError(error)))
        )
      )
    )
  );

  public getSupplierComplaints$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getSupplierComplaints),
      switchMap(() =>
        this._adminService.getSupplierComplaints().pipe(
          map((KAMSupplierComplaints: IComplaints[]) => fromAdminActions.getSupplierComplaintsSuccess({KAMSupplierComplaints})),
          catchError(error => of(fromAdminActions.getSupplierComplaintsError(error)))
        )
      )
    )
  );

  public getResellerComplaints$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getResellerComplaints),
      switchMap(() =>
        this._adminService.getResellerComplaints().pipe(
          map((KAMResellerComplaints: IComplaints[]) => fromAdminActions.getResellerComplaintsSuccess({KAMResellerComplaints})),
          catchError(error => of(fromAdminActions.getResellerComplaintsError(error)))
        )
      )
    )
  );

  public getViewCatalogues$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getViewCatalogues),
      map(action => action.filter),
      switchMap((filter: IFilter) =>
        this._adminService.getViewCatalogues(filter).pipe(
          // tslint:disable-next-line: max-line-length
          map((viewCataloguesList: IUploadedCatalogue[]) => fromAdminActions.getViewCataloguesSuccess({viewCataloguesList})),
          catchError(error => of(fromAdminActions.getViewCataloguesError(error)))
        )
      )
    )
  );

  public getCatalogueManagementCount$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminActions.getCatalogueManagementCount),
      map(action => action.filter),
      switchMap((filter: ICatalogueManagementCountFilter) =>
        this._adminService.getCatalogueManagementCount(filter).pipe(
          map((count: number) => fromAdminActions.getCatalogueManagementCountSuccess({catalogueManagementCount: count})),
          catchError(error => of(fromAdminActions.getCatalogueManagementCountError(error)))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _adminService: AdminService,
    private _store: Store<fromRouter.IRouterState>) {
  }

}
