import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {environment} from '~env/environment';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  constructor(private _http: HttpClient) {
  }

  public passwordRecovery(email: string): Observable<string> {
    return this._http.post<string>(`${environment.API_BASE_URL}/api/v1/user/password-recovery/${email}`, email);
  }
}
