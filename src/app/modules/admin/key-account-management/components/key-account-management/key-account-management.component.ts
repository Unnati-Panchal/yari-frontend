import { Component, OnInit } from '@angular/core';
import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~app/store/app.state';

@Component({
  selector: 'app-key-account-management',
  templateUrl: './key-account-management.component.html',
  styleUrls: ['./key-account-management.component.scss']
})
export class KeyAccountManagementComponent implements OnInit {

  constructor(
    private _adminService: AdminService,
    private _appFacade: AppFacade
  ) { }

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('key_account_management');

    this._adminService.getSupplierList().subscribe(res => console.log({getSupplierList: res}));
    this._adminService.getSupplierById(33).subscribe(res => console.log({getSupplierById: res}));
    this._adminService.getCatalogList().subscribe(res => console.log({getCatalogList: res}));
    this._adminService.getProductsByCatalogId(33).subscribe(res => console.log({getProductsByCatalogId: res}));
    this._adminService.getSupplierOnBoardings().subscribe(res => console.log({getSupplierOnBoardings: res}));
    this._adminService.downloadSupplier().subscribe(res => console.log({downloadSupplier: res}));
    this._adminService.getSupplierComplaints().subscribe(res => console.log({getSupplierComplaints: res}));
    this._adminService.getResellerComplaints().subscribe(res => console.log({getResellerComplaints: res}));
  }
}
