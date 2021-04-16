import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@yaari/services/admin/admin.service';
import { AppFacade } from '~store/app.state';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetPassForm: FormGroup;
  public hide: boolean;
  public loading: boolean;

  private _token: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _appFacade: AppFacade,
    private _activatedRoute: ActivatedRoute,
    private _adminService: AdminService,
    private _router: Router
  ) {
  }

  public ngOnInit(): void {
    this._appFacade.clearMessages();
    this.initForm();
    this._activatedRoute.queryParams.subscribe(params => {
      this._token = params.token;
      if (!this._token){
        // this._router.navigate(['/admin']);
      }
    });
  }

  public resetPass(): void {
    this.loading = true;
    this.resetPassForm.updateValueAndValidity();
    if (!this.resetPassForm.value.password) {
      this.loading = false;
      return;
    }
    if (this.resetPassForm.value.password !== this.resetPassForm.value.repeatPassword) {
      this.resetPassForm.get('repeatPassword').setErrors({ notMatch: true });
      this.loading = false;
      return;
    } else {
      this.resetPassForm.get('repeatPassword').setErrors(null);
    }
    const resetPasswordInfo = {
      access_token: this._token,
      new_password: this.resetPassForm.value.password
    };
    this._adminService.resetPasswordAdmin(resetPasswordInfo).subscribe(res => {
      console.log(res);
      this.loading = false;
    });
  }

  public initForm(): void {
    this.resetPassForm = this._formBuilder.group({
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    });

    // this._subscription.add(
    //   this.isSuccessMsg$.subscribe( (msg) => {
    //     this._snackBar.open(msg, '', {duration: 3000});
    //     this._router.navigate(['auth/login']);
    //   })
    // );
  }
}
