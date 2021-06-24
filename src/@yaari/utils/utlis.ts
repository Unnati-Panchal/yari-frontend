import {ESortDirection, ICatalogProducts} from '@yaari/models/product/product.interface';
import {Sort} from '@angular/material/sort';
import {IFilter} from '@yaari/models/admin/admin.interface';

export class Utilities {

  public static mapKeyValues(specKeys: string[], item: ICatalogProducts): ICatalogProducts {
    let result = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < specKeys.length; i++) {
      const currentKey = specKeys[i];
      result = [...result, {id: currentKey, value: item.specDetails[i]}];
    }
    return result.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.value }), {});
  }

  public static sortData(sort: Sort, dataList: any): any {
    const data = dataList.slice();
    if (!sort.active || sort.direction === '') {
      return dataList;
    }

    return data.sort((a, b) => {
      const isAsc = sort.direction === ESortDirection.Asc;
      switch (sort.active) {
        case 'catalog_name':
          return compare(a.catalog_name, b.catalog_name, isAsc);
        case 'category_name':
          return compare(a.category_name, b.category_name, isAsc);
        case 'created_time':
          return compare(a.created_time, b.created_time, isAsc);
        case 'approved':
          return compare(a.approved, b.approved, isAsc);
        case 'viewed':
          return compare(a.viewed, b.viewed, isAsc);
        case 'shared':
          return compare(a.shared, b.shared, isAsc);
        default:
          return 0;
      }
    });
  }

  public static scrollToFirstInvalidControl(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

export function compare(a: number | string, b: number | string, isAsc: boolean): any {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function getQuery(filter: IFilter): string {
  let query = '';
  if (filter?.filterBy || filter?.limit || filter?.skip) {
    query = '?';
  }
  if (filter?.filterBy) {
    query += `filter_by=${filter.filterBy}`;
  }
  if (filter?.limit) {
    if (filter?.filterBy) {
      query += `&`;
    }
    query += `limit=${filter.limit}`;
  }
  if (filter?.skip) {
    if (filter?.filterBy || filter?.limit) {
      query += `&`;
    }
    query += `skip=${filter.skip}`;
  }
  return query;
}

export function getQueryAndParam(filter: IFilter): string {
  let url = '';
  let qs = '';
  for (const key in filter) {
    const value = filter[key];
    qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + '?' + qs;
  }
  return url;
}

export function toDataURL(url): Promise<string> {
  return fetch(url).then((response) => {
    return response.blob();
  }).then(blob => {
    return URL.createObjectURL(blob);
  });
}

export async function downloadFile(url): Promise<void> {
  const a = document.createElement('a');
  a.href = await toDataURL(url);
  a.download = 'image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
