import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '~env/environment';
import {ILogin, IRegistration, IToken} from '@yaari/models/auth/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {
  }

  public registerSupplier(body: IRegistration): Observable<IRegistration> {
    return this._http.post<IRegistration>(`${environment.API_BASE_URL}/api/v1/supplier/register`, body);
  }

  public passwordRecovery(email: string): Observable<string> {
    return this._http.post<string>(`${environment.API_BASE_URL}/api/v1/user/password-recovery/${email}`, email);
  }

  public login(login: ILogin): Observable<IToken> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    const body = new URLSearchParams();
    body.set('username', login.username);
    body.set('password', login.password);
    body.set('user_role', login.user_role);
    return this._http.post<IToken>
    (`${environment.API_BASE_URL}/api/v1/user/login/access-token?user_role=supplier`, body.toString(), httpOptions);
  }
}
