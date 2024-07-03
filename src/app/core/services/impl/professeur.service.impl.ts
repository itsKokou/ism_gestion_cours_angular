import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { DetailClasse, DetailModule } from '../../models/detail';
import { ProfesseurService } from '../professeur.service';
import { ProfesseurList, ProfesseurCreate } from '../../models/professeur';
import { BaseServiceImpl } from './base.service.impl';
import { Enseignement } from '../../models/enseignement';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurServiceImpl extends BaseServiceImpl<ProfesseurList,ProfesseurCreate> implements ProfesseurService {

  constructor(http:HttpClient) {
    super(http,`${environment.APIURL}/professeurs`);
  }

  planifierProfesseur(id: number): Observable<RestResponse<string>> {
    return this.http.get<RestResponse<string>>(`${this.ApiUrl}/planifier/${id}`);
  }

  findAllWithFilterAndPlanifier(page: number, module: number, grade: string, portable: string, planifier: boolean): Observable<RestResponse<ProfesseurList[]>> {
    return this.http.get<RestResponse<ProfesseurList[]>>(`${this.ApiUrl}?page=${page}&grade=${grade}&portable=${portable}&module=${module}&planifier=${planifier}`); 
  }

  findByModule(idModule: number): Observable<RestResponse<ProfesseurList[]>> {
    return this.http.get<RestResponse<ProfesseurList[]>>(`${this.ApiUrl}/filter/module/${idModule}`);
  }

  findAllList(): Observable<RestResponse<ProfesseurList[]>> {
    return this.http.get<RestResponse<ProfesseurList[]>>(`${this.ApiUrl}/all`);
  }

  makeAffectation(enseignements: Enseignement[]): Observable<RestResponse<Enseignement[]>> {
    return  this.http.post<RestResponse<Enseignement[]>>(`${this.ApiUrl}/affectation`, enseignements);
  }

  findAllGrade(): Observable<RestResponse<string[]>> {
    return this.http.get<RestResponse<string[]>>(`${this.ApiUrl}/grades`); 
  }

  findDetailClasse(id: number): Observable<RestResponse<DetailClasse>> {
    return this.http.get<RestResponse<DetailClasse>>(`${this.ApiUrl}/classe/${id}`); 
  }

  findDetailModule(id: number): Observable<RestResponse<DetailModule>> {
    return this.http.get<RestResponse<DetailModule>>(`${this.ApiUrl}/module/${id}`); 
  }  
}
