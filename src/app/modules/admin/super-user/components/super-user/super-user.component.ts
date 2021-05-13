import { Component, OnInit } from '@angular/core';
import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~app/store/app.state';

@Component({
  selector: 'app-super-user',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.scss']
})
export class SuperUserComponent implements OnInit {

  constructor(
    private _appFacade: AppFacade,
    private _adminService: AdminService
  ) { }

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('super_user');
  }
}
