import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@yaari/services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { IAppState } from '~app/store/app.state';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import * as fromAuthActions from '~store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public adminDetails$ = this._store.pipe(
    select(fromAuthSelectors.adminDetails$),
    filter(details => !!details)
  );

  constructor(private _auth: AuthService, private _store: Store<IAppState>) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._auth.logoutAdmin();
    this.adminDetails$ = this._store.pipe(
      select(fromAuthSelectors.adminDetails$),
      filter(details => !!details)
    );
  }

}
