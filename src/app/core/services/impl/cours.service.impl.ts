import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SalleModule } from '../../../secure/modules/salle/salle.module';
import { SalleCreate, SalleList } from '../../models/salle';
import { BaseServiceImpl } from './base.service.impl';
import { CoursService } from '../cours.service';
import { CoursCreate, CoursList } from '../../models/cours';
import { Observable } from 'rxjs';
import { RestResponse } from '../../models/rest.response';

@Injectable({
  providedIn: 'root'
})
export class CoursServiceImpl extends BaseServiceImpl<CoursList,CoursCreate> implements CoursService {
  
  constructor(http:HttpClient) {
    super(http,`${environment.APIURL}/cours`);
  }
  archivateCours(msg: string, id: number): Observable<RestResponse<string>> {
    return  this.http.put<RestResponse<string>>(`${this.ApiUrl}/${id}`, msg);
  }

  findAllWithFilter(page: number, etat: string="", classe: number=0, semestre: number=0,prof:number=0): Observable<RestResponse<CoursList[]>> {
    return this.http.get<RestResponse<CoursList[]>>(`${this.ApiUrl}?page=${page}&etat=${etat}&classe=${classe}&semestre=${semestre}&professeur=${prof}`); 
  }

}
