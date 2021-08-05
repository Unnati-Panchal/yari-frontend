import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@yaari/services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { IAppState } from '~app/store/app.state';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import {AdminService, IMenuItem} from '@yaari/services/admin/admin.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menu$: Observable<IMenuItem[]>;

  public adminDetails$ = this._store.pipe(
    select(fromAuthSelectors.adminDetails$),
    filter(details => !!details)
  );

  public token$ = this._store.pipe(
    select(fromAuthSelectors.getToken),
    filter(token => !!token)
  );
  constructor(private _auth: AuthService,
              private _store: Store<IAppState>,
              private _snackbar: MatSnackBar,
              private adminService: AdminService
  ) { }

  adminRole: string;

  ngOnInit(): void {
    this.menu$ = this.adminService.activeHeaderMenu$;
  }

  logout(): void {
    this._auth.logoutService().subscribe(res => this._snackbar.open(res.msg, '', { duration: 5000 }));
    this._auth.logoutAdmin();

    this.adminDetails$ = this._store.pipe(
      select(fromAuthSelectors.adminDetails$),
      filter(details => !!details)
    );
  }
}
