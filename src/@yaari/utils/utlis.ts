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
}

export function compare(a: number | string, b: number | string, isAsc: boolean): any {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function getQuery(filter: IFilter): string {
  let query: string;
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
