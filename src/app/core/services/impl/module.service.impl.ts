import { Injectable } from '@angular/core';
import { ModuleService } from '../module.service';
import { Observable } from 'rxjs';
import { ModuleList, ModuleCreate } from '../../models/module';
import { RestResponse } from '../../models/rest.response';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BaseServiceImpl } from './base.service.impl';

@Injectable({
  providedIn: 'root'
})
export class ModuleServiceImpl extends BaseServiceImpl<ModuleList,ModuleCreate> implements ModuleService {

  constructor(http:HttpClient) {
    super(http,`${environment.APIURL}/modules`);
  }

  findAllList(): Observable<RestResponse<ModuleList[]>> {
    return this.http.get<RestResponse<ModuleList[]>>(`${this.ApiUrl}/all`);
  }

}
