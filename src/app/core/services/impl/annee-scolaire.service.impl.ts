import { Injectable } from '@angular/core';
import { AnneeScolaireService } from '../annee-scolaire.service';
import { Observable } from 'rxjs';
import { AnneeScolaireList, AnneeScolaireCreate } from '../../models/annee.scolaire';
import { RestResponse } from '../../models/rest.response';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BaseServiceImpl } from './base.service.impl';

@Injectable({
  providedIn: 'root',
})
export class AnneeScolaireServiceImpl extends BaseServiceImpl<AnneeScolaireList,AnneeScolaireCreate> implements AnneeScolaireService {
  
  constructor(http:HttpClient) {
    super(http,`${environment.APIURL}/annees/scolaires`);
  }

  findAllList(): Observable<RestResponse<AnneeScolaireList[]>> {
    return this.http.get<RestResponse<AnneeScolaireList[]>>(`${this.ApiUrl}/all`);
  }
}
