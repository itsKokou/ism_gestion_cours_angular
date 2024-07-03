import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { AuthentificationRequest, TokenResponse } from '../../models/authentification';
import { Observable } from 'rxjs';
import { RestResponse } from '../../models/rest.response';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthentificateService {
  
  isAuthentificated: boolean=true
  username:string|null=null
  roles:string[]=[]
  private isBrowser: boolean=false;
  private apiUrl=`${environment.APIURL}`;

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId:any) { 
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(data: AuthentificationRequest): Observable<RestResponse<TokenResponse>> {
    return this.http.post<RestResponse<TokenResponse>>(`${this.apiUrl}/login`, data);
  }

  getAuthToken():string{
      if(this.isBrowser) {
        return localStorage.getItem('token')??"";
      }
      return "";
  }

}
