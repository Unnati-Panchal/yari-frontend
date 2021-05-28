import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogue-content-management',
  templateUrl: './catalogue-content-management.component.html',
  styleUrls: ['./catalogue-content-management.component.scss']
})
export class CatalogueContentManagementComponent implements OnInit {

  selectedTabIndex = 0;
  productIds = [];
  selectedProductId = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.route.snapshot.queryParamMap.has('productIds')) {
      {
        const productIds = this.route.snapshot.queryParamMap.get('productIds').split(',');

        this.selectedProductId = productIds[0];

        this.pushProductIds(productIds);
      }
    }
  }

  selectedIndexChange(index: number): void {
    this.selectedTabIndex = index;
  }

  pushProductIds(productIds: string[]): void {
    productIds.forEach(productId => {
      this.productIds.push(productId);
    });
  }

  arrangeProductIdQuery(productId: string): string[] {
    if (!this.productIds) {
      return null;
    }

    const currentProductId = this.productIds.find(p => p === productId);
    if (!currentProductId) {
      return this.productIds;
    }

    const newProductIds = [...this.productIds.filter(p => p !== currentProductId)];

    newProductIds.unshift(currentProductId);

    return newProductIds;
  }

  changeProductId(productId: string): void {
    this.selectedProductId = productId;
  }
}
