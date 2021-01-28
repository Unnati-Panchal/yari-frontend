import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {environment} from '~env/environment';

import {ApiService} from '@yaari/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  constructor(private _apiService: ApiService) {
  }

  public passwordRecovery(email: string): Observable<string> {
    return this._apiService.post(`${environment.API_BASE_URL}/api/v1/user/password-recovery/${email}`, email);
  }
}
