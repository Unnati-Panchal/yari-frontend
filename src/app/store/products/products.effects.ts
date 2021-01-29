import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRouter from '~store/route/route.selectors';
import * as fromProductsActions from '~store/products/products.actions';
import {ProductsService} from '@yaari/services/products/products.service';
import {ICategory} from '@yaari/models/product/product.interface';

@Injectable()
export class ProductsEffects {
  public getCategories = createEffect(() =>
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

  constructor(
    private _actions$: Actions,
    private _productsService: ProductsService,
    private _store: Store<fromRouter.IRouterState>
  ) {}

}
