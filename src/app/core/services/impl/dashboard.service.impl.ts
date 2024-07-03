import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ProfHome, RPHome } from '../../models/home';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceImpl implements DashboardService {

  private ApiUrl = `${environment.APIURL}/homes`;

  constructor(private http: HttpClient) {}

  findProfData(id: number): Observable<RestResponse<ProfHome>> {
    return this.http.get<RestResponse<ProfHome>>(`${this.ApiUrl}/professeur/${id}`);
  }

  findRPData(id: number): Observable<RestResponse<RPHome>> {
    return this.http.get<RestResponse<RPHome>>(`${this.ApiUrl}/rp/${id}`);
  }

}
