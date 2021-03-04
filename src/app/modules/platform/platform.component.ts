import { Component, OnInit } from '@angular/core';
import {AuthService} from '@yaari/services/auth/auth.service';
import {select, Store} from '@ngrx/store';
import * as fromAuthSelectors from '~store/auth/auth.selectors';
import {filter} from 'rxjs/operators';
import {IAppState} from '~store/app.state';
import * as fromAuthActions from '~store/auth/auth.actions';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  public supplierDetails$ = this._store.pipe(
    select(fromAuthSelectors.supplierDetails$),
    filter(details => !!details)
  );
  public isMenuOpened: boolean;

  constructor(private _auth: AuthService, private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromAuthActions.supplierDetails());
  }

  logout(): void {
    this._auth.logout();
  }

}
