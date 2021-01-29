import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '~env/environment';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService {
  constructor(private _http: HttpClient) {
  }

}
