import { Injectable } from '@angular/core';
import { SemestreService } from '../semestre.service';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SemestreCreate, SemestreList } from '../../models/semestre';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { BaseServiceImpl } from './base.service.impl';

@Injectable({
  providedIn: 'root'
})
export class SemestreServiceImpl extends BaseServiceImpl<SemestreList,SemestreCreate> implements SemestreService {

  constructor(http:HttpClient) {
    super(http,`${environment.APIURL}/semestres`);
  }

  findAllList(): Observable<RestResponse<SemestreList[]>> {
    return this.http.get<RestResponse<SemestreList[]>>(`${this.ApiUrl}/all`);
  }
  
}
