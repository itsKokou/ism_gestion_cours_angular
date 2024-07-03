import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SalleCreate, SalleList } from '../../models/salle';
import { BaseServiceImpl } from './base.service.impl';
import { SalleService } from '../salle.service';
import { Observable } from 'rxjs';
import { RestResponse } from '../../models/rest.response';

@Injectable({
  providedIn: 'root'
})
export class SalleServiceImpl extends BaseServiceImpl<SalleList,SalleCreate> implements SalleService {
  
  constructor(http:HttpClient) {
    super(http,`${environment.APIURL}/salles`);
  }

  planifierSalle(id: number): Observable<RestResponse<string>> {
    return this.http.get<RestResponse<string>>(`${this.ApiUrl}/planifier/${id}`);
  }

  findAllByPlanifier(page: number, planifier: boolean): Observable<RestResponse<SalleList[]>> {
    return this.http.get<RestResponse<SalleList[]>>(`${this.ApiUrl}?page=${page}&planifier=${planifier}`);
  }

  findAllList(): Observable<RestResponse<SalleList[]>> {
    return this.http.get<RestResponse<SalleList[]>>(`${this.ApiUrl}/all`);
  }

}
