import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IResMsg } from '@yaari/models/admin/admin.interface';
import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~app/store/app.state';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(
    private _appFacade: AppFacade,
    private _adminService: AdminService,
    private _snackbar: MatSnackBar
  ) { }

  allRolesAndDesignations: any = {
    profiles: [],
    designations: []
  };

  createUserForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    phone_no: new FormControl('', Validators.required),
    email_id: new FormControl('', Validators.required),
    admin_role: new FormControl('', Validators.required),
    admin_designation: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this._appFacade.clearMessages();
    this._adminService.authorizedAdmin('super_user');
    this.getAllRolesAndDesignations();
  }

  getAllRolesAndDesignations(): void {
    this._adminService.getAllRolesDesignations().subscribe(data => this.allRolesAndDesignations = data);
  }

  registerAdminUser(): void {
    if (this.createUserForm.value.admin_role === 'SUPER_USER') {
      this.createUserForm.controls.admin_designation.setValue('');
      this.createUserForm.controls.admin_designation.setErrors(null);
    }
    if (this.createUserForm.invalid) {
      return;
    }
    this._adminService.createAdminUser(this.createUserForm.value).subscribe((res: IResMsg) => {
      this._snackbar.open(res.msg, '', { duration: 3000 });
      if (res.success === true) {
        window.location.reload();
      }
    });
  }
}
