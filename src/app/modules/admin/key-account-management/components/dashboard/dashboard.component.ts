import { Component } from '@angular/core';
import {IMenuItem, resellerDashboardMenu, supplierDashboardMenu} from '~admin/key-account-management/components/dashboard/menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public supplierDashboardMenu: IMenuItem[] = supplierDashboardMenu;
  public resellerDashboardMenu: IMenuItem[] = resellerDashboardMenu;
  public isResellerMenu = false;
}
