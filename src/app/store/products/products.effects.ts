import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromProductsActions from '~store/products/products.actions';
import {ProductsService} from '@yaari/services/products/products.service';
import {
  IBulkUploadBasic,
  IBulkUploadStatus,
  ICatalogProducts,
  ICategory,
  IFileUpload,
  IQuery,
  ISpecifications
} from '@yaari/models/product/product.interface';

@Injectable()
export class ProductsEffects {
  public getCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getCategories),
      map(action => action.categoryId),
      switchMap((categoryId: string) =>
        this._productsService.getCategories(categoryId).pipe(
          map((categories: ICategory[]) => fromProductsActions.getCategoriesSuccess({ categories })),
          catchError(error => of(fromProductsActions.getCategoriesError(error)))
        )
      )
    )
  );

  public getCities$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getCities),
      map(action => action.stateId),
      switchMap((stateId: number) =>
        this._productsService.getCities(stateId).pipe(
          map((cities: ICategory[]) => fromProductsActions.getCitiesSuccess({ cities })),
          catchError(error => of(fromProductsActions.getCitiesError(error)))
        )
      )
    )
  );

  public getStates$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getStates),
      switchMap(() =>
        this._productsService.getStates().pipe(
          map((states: ICategory[]) => fromProductsActions.getStatesSuccess({ states })),
          catchError(error => of(fromProductsActions.getStatesError(error)))
        )
      )
    )
  );

  // public getBulkBasicUploadTemplate$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(fromProductsActions.getBulkBasicUploadTemplate),
  //     switchMap(() =>
  //       this._productsService.getBulkBasicUploadTemplate().pipe(
  //         map((file: any) => fromProductsActions.getBulkBasicUploadTemplateSuccess({ file })),
  //         catchError(error => of(fromProductsActions.getBulkBasicUploadTemplateError(error)))
  //       )
  //     )
  //   )
  // );

  public bulkUploadCatalog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.bulkUploadCatalog),
      map(action => action.fileUpload),
      switchMap((fileUpload: IFileUpload) =>
        this._productsService.bulkUploadCatalog(fileUpload).pipe(
          map((bulkUploadBasic: IBulkUploadBasic) => fromProductsActions.bulkUploadCatalogSuccess({ bulkUploadBasic })),
          catchError(error => of(fromProductsActions.bulkUploadCatalogError(error)))
        )
      )
    )
  );

  public getCatalogs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getCatalogs),
      map(action => action.query),
      switchMap((query: IQuery) =>
        this._productsService.getCatalogs(query).pipe(
          map((catalogs: IBulkUploadBasic[]) => fromProductsActions.getCatalogsSuccess({ catalogs })),
          catchError(error => of(fromProductsActions.getCatalogsError(error)))
        )
      )
    )
  );

  public deleteCatalog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.deleteCatalog),
      map(action => action.catalogId),
      switchMap((catalogId: string) =>
        this._productsService.deleteCatalog(catalogId).pipe(
          map(({msg}) => fromProductsActions.deleteCatalogSuccess({msg})),
          catchError(error => of(fromProductsActions.deleteCatalogError(error)))
        )
      )
    )
  );

  public getBulkSpecificationsUploadTemplate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getBulkSpecificationsUploadTemplate),
      map(action => action.catalogId),
      switchMap((catalogId: string) =>
        this._productsService.getBulkSpecificationsUploadTemplate(catalogId).pipe(
          map((specTemplate: string[]) => fromProductsActions.getBulkSpecificationsUploadTemplateSuccess({ specTemplate })),
          catchError(error => of(fromProductsActions.getBulkSpecificationsUploadTemplateError(error)))
        )
      )
    )
  );


  public editSpecifications$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.editSpecifications),
      map(action => action.spec),
      switchMap((spec: ISpecifications) =>
        this._productsService.editSpecifications(spec).pipe(
          map(({msg}) => fromProductsActions.editSpecificationsSuccess({msg})),
          catchError((error) => of(fromProductsActions.editSpecificationsError(error)))
        )
      )
    )
  );

  public getCatalogProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getCatalogProducts),
      map(action => action.catalogId),
      switchMap((catalogId: string) =>
        this._productsService.catalogProducts(catalogId).pipe(
          map((catalogProducts: ICatalogProducts[]) => fromProductsActions.getCatalogProductsSuccess({ catalogProducts })),
          catchError(error => of(fromProductsActions.getCatalogProductsError(error)))
        )
      )
    )
  );

  public getBulkUploadStatuses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getBulkUploadStatuses),
      switchMap(() =>
        this._productsService.getBulkUploadStatuses().pipe(
          map((bulkUploadStatuses: IBulkUploadStatus[]) => fromProductsActions.getBulkUploadStatusesSuccess({ bulkUploadStatuses })),
          catchError(error => of(fromProductsActions.getBulkUploadStatusesError(error)))
        )
      )
    )
  );

  public getBulkUploadStatusById$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getBulkUploadStatusById),
      map(action => action.taskId),
      switchMap((taskId: string) =>
        this._productsService.getBulkUploadStatusById(taskId).pipe(
          map((singleBulkUploadStatus: IBulkUploadStatus) =>
            fromProductsActions.getBulkUploadStatusByIdSuccess({ singleBulkUploadStatus })
          ),
          catchError(error => of(fromProductsActions.getBulkUploadStatusByIdError(error)))
        )
      )
    )
  );

  public getCatalogueById$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getCatalogById),
      map(action => action.id),
      switchMap((id: string) =>
        this._productsService.getCatalogByName(id).pipe(
          map((selectedCatalogue: IBulkUploadBasic) =>
            fromProductsActions.getCatalogByIdSuccess({ selectedCatalogue })
          ),
          catchError(error => of(fromProductsActions.getCatalogByIdError(error)))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _productsService: ProductsService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}
