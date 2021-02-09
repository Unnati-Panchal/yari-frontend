import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '~env/environment';
import {IBucket} from '@yaari/models/profile/profile.interface';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private _http: HttpClient) {
  }

  public getBuckets(): Observable<IBucket[]> {
    return this._http.get<IBucket[]>(`${environment.API_BASE_URL}/api/v1/dashboard/buckets`);
  }
}
