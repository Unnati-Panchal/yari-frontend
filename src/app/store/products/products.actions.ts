import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';

import {ICategory} from '@yaari/models/product/product.interface';

export const getCategories = createAction('[PRODUCTS] get categories');

export const getCategoriesSuccess = createAction('[PRODUCTS] get categories success', props<{ categories: ICategory[]}>());

export const getCategoriesError = createAction('[PRODUCTS] get categories error', props<{ error: HttpErrorResponse }>());
