import {ICatalogProducts} from '@yaari/models/product/product.interface';

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
}
