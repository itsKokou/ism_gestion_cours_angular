import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BaseServiceImpl } from './base.service.impl';
import { ClasseService } from '../classe.service';
import { ClasseCreate, ClasseList } from '../../models/classe';
import { Observable } from 'rxjs';
import { RestResponse } from '../../models/rest.response';

@Injectable({
  providedIn: 'root'
})
export class ClasseServiceImpl extends BaseServiceImpl<ClasseList,ClasseCreate> implements ClasseService {

  constructor(http:HttpClient) {
    super(http,`${environment.APIURL}/classes`);
  }

  planifierClasse(id: number): Observable<RestResponse<string>> {
    return this.http.get<RestResponse<string>>(`${this.ApiUrl}/planifier/${id}`);
  }

  findAllByNiveauAndFiliereAndPlanifier(page: number, niveau: number, filiere: number, planifier: boolean): Observable<RestResponse<ClasseList[]>> {
    return this.http.get<RestResponse<ClasseList[]>>(`${this.ApiUrl}?page= ${page}&niveau=${niveau}&filiere=${filiere}&planifier=${planifier}`); 
  }
  
  findByProfesseurAndModuleAndSemestre(idProf: number, idModule: number, idSemestre:number): Observable<RestResponse<ClasseList[]>> {
     return this.http.get<RestResponse<ClasseList[]>>(`${this.ApiUrl}/filter/module/${idModule}/professeur/${idProf}/semestre/${idSemestre}`); 
  }
  
  findAllList(): Observable<RestResponse<ClasseList[]>> {
    return this.http.get<RestResponse<ClasseList[]>>(`${this.ApiUrl}/all`);
  }
  
}
