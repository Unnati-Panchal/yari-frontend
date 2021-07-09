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
        case 'catalogue_name':
          return compare(a.catalogue_name, b.catalogue_name, isAsc);
        case 'supplier_business_name':
          return compare(a.supplier_business_name, b.supplier_business_name, isAsc);
        case 'catalogue_uploaded_by':
          return compare(a.catalogue_uploaded_by, b.catalogue_uploaded_by, isAsc);
        case 'catalogue_uploaded_date':
          return compare(a.catalogue_uploaded_date, b.catalogue_uploaded_date, isAsc);
        case 'category_name':
          return compare(a.category_name, b.category_name, isAsc);
        case 'catalogue_status':
          return compare(a.catalogue_status, b.catalogue_status, isAsc);
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
  const pom = document.createElement('a');
  pom.setAttribute('href', url);
  let name = url.split('/');
  name = name[name.length - 1];
  pom.setAttribute('download', name);
  pom.style.display = 'none';
  document.body.appendChild(pom);
  pom.click();
  document.body.removeChild(pom);
}
