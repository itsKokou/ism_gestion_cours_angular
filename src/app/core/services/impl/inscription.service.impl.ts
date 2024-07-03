import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BaseServiceImpl } from './base.service.impl';
import { Observable } from 'rxjs';
import { RestResponse } from '../../models/rest.response';
import { InscriptionCreate, InscriptionList, Reinscription } from '../../models/inscription';
import { InscriptionService } from '../inscription.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionServiceImpl extends BaseServiceImpl<InscriptionList,InscriptionCreate> implements InscriptionService {
  
  constructor(http:HttpClient) {
    super(http,`${environment.APIURL}/inscriptions`);
  }

  makeReinscription(reinscription: Reinscription): Observable<RestResponse<Reinscription>> {
    return this.http.post<RestResponse<Reinscription>>(`${this.ApiUrl}/reinscription`, reinscription);
  }
  
  archivateInscription(msg: string, id: number): Observable<RestResponse<string>> {
    return  this.http.put<RestResponse<string>>(`${this.ApiUrl}/${id}`, msg);
  }

  findAllWithFilter(page: number,annee:number, classe: number=0, date: string=''): Observable<RestResponse<InscriptionList[]>> {
    return this.http.get<RestResponse<InscriptionList[]>>(`${this.ApiUrl}?page=${page}&annee=${annee}&classe=${classe}&date=${date}`); 
  }

}
