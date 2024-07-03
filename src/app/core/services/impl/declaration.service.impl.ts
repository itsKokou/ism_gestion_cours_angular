import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AbsenceService } from '../absence.service';
import { AbsenceList } from '../../models/absence';
import { DeclarationService } from '../declaration.service';
import { DeclarationCreate, DeclarationList } from '../../models/declaration';

@Injectable({
  providedIn: 'root'
})
export class DeclarationServiceImpl implements DeclarationService {

  private ApiUrl = `${environment.APIURL}/declarations`;

  constructor(private http: HttpClient) {}

  findAll(page: number, etat: string): Observable<RestResponse<DeclarationList[]>> {
    return this.http.get<RestResponse<DeclarationList[]>>(`${this.ApiUrl}?page=${page}&etat=${etat}`);
  }

  traiterDeclaration(id: number, userId: number, seanceId: number, action: string): Observable<RestResponse<string>> {
    return this.http.get<RestResponse<string>>(`${this.ApiUrl}/${id}/professeur/${userId}/seance/${seanceId}/${action}`);
  }

  create(dataCreate: DeclarationCreate): Observable<RestResponse<DeclarationCreate>> {
    return  this.http.post<RestResponse<DeclarationCreate>>(`${this.ApiUrl}`, dataCreate);
  }
  
}
