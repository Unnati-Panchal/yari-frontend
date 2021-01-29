import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '~env/environment';

import {IGstPanResponse} from '@yaari/models/third-party/third-party.interface';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService {
  private _httpOptions = {
    headers: new HttpHeaders({
      authkey: environment.invoidAuthKey,
    })
  };
  constructor(private _http: HttpClient) {
  }

  public emailVerification(email: string): Observable<IGstPanResponse> {

/*    Send OTP:
      curl --location --request POST ‘https://verifyemail.invoid.co/generateotp’ \
--data-raw ‘{“email”: “abinash@invoid.co”, “otpLength”: 6, “otpExipry”: 10}’

Verify OTP:
      curl --location --request POST ‘https://verifyemail.invoid.co/verifyotp’ \
--data-raw ‘{“otp”: “566357, “email”: “abinash@invoid.co”}’*/

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authkey: environment.invoidAuthKey,
      })
    };
    // return this._http.post<any>(`${environment.thirdPartyVerifyEmail}/verifyotp`, JSON.stringify({email}), httpOptions);
    return this._http.post<IGstPanResponse>(`${environment.thirdPartyVerifyEmail}/generateotp`, JSON.stringify({email}), httpOptions);
  }

  public uploadGstCertificate(certificate: string): Observable<IGstPanResponse> {
    const formData = new FormData();
    formData.append('docType', 'gst-lite');
    formData.append('docNumber', certificate);
    return this._http.post<IGstPanResponse>(`${environment.thirdPartyPanAndGstVerification}/v3`, formData, this._httpOptions);
  }

  public uploadPanCard(panCard: number): Observable<IGstPanResponse> {
    const formData = new FormData();
    formData.append('docType', 'pan');
    formData.append('docNumber', String(panCard));
    return this._http.post<IGstPanResponse>(`${environment.thirdPartyPanAndGstVerification}/v3`, formData, this._httpOptions);
  }
}
