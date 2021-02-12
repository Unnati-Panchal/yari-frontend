import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromProductsActions from '~store/products/products.actions';
import {ProductsService} from '@yaari/services/products/products.service';
import {IBulkUploadBasic, ICategory, IFileUpload, ISpecifications} from '@yaari/models/product/product.interface';

@Injectable()
export class ProductsEffects {
  public getCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getCategories),
      switchMap(() =>
        this._productsService.getCategories().pipe(
          map((categories: ICategory[]) => fromProductsActions.getCategoriesSuccess({ categories })),
          catchError(error => of(fromProductsActions.getCategoriesError({ error })))
        )
      )
    )
  );

  public getBulkBasicUploadTemplate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.getBulkBasicUploadTemplate),
      switchMap(() =>
        this._productsService.getBulkBasicUploadTemplate().pipe(
          map((file: any) => fromProductsActions.getBulkBasicUploadTemplateSuccess({ file })),
          catchError(error => of(fromProductsActions.getBulkBasicUploadTemplateError({ error })))
        )
      )
    )
  );

  public bulkUploadCatalog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.bulkUploadCatalog),
      map(action => action.fileUpload),
      switchMap((fileUpload: IFileUpload) =>
        this._productsService.bulkUploadCatalog(fileUpload).pipe(
          map((bulkUploadBasic: IBulkUploadBasic) => fromProductsActions.bulkUploadCatalogSuccess({ bulkUploadBasic })),
          catchError(error => of(fromProductsActions.bulkUploadCatalogError({ error })))
        )
      )
    )
  );

  public getCatalogs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromProductsActions.bulkUploadCatalog),
      map(action => action.fileUpload),
      switchMap((fileUpload: IFileUpload) =>
        this._productsService.bulkUploadCatalog(fileUpload).pipe(
          map((bulkUploadBasic: IBulkUploadBasic) => fromProductsActions.bulkUploadCatalogSuccess({ bulkUploadBasic })),
          catchError(error => of(fromProductsActions.bulkUploadCatalogError({ error })))
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
          map(() => fromProductsActions.bulkUploadCatalogSuccess),
          catchError(error => of(fromProductsActions.deleteCatalogError({ error })))
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
          map((specTemplate: string) => fromProductsActions.getBulkSpecificationsUploadTemplateSuccess({ specTemplate })),
          catchError(error => of(fromProductsActions.getBulkSpecificationsUploadTemplateError({ error })))
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
          map(() => fromProductsActions.geditSpecificationsSuccess()),
          catchError(error => of(fromProductsActions.editSpecificationsError({ error })))
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
