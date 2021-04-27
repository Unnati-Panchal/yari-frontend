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
  // tslint:disable-next-line:max-line-length
  public defaultImage = 'https://s3.ap-south-1.amazonaws.com/yaari-main-qa/yaari/security_images/bae1377de5da5a9edb8dce8e2eaac3c2_image.png';

  constructor(private _auth: AuthService, private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this._store.dispatch(fromAuthActions.supplierDetails());
  }

  logout(): void {
    this._auth.logout();
  }

}
