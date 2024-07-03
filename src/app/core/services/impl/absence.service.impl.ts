import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AbsenceService } from '../absence.service';
import { AbsenceList } from '../../models/absence';

@Injectable({
  providedIn: 'root'
})
export class AbsenceServiceImpl implements AbsenceService {

  private ApiUrl = `${environment.APIURL}/absences`;

  constructor(private http: HttpClient) {}
  
  findAll(page: number, mat:string=''): Observable<RestResponse<AbsenceList[]>> {
    return this.http.get<RestResponse<AbsenceList[]>>(`${this.ApiUrl}?page=${page}&matricule=${mat}`); 
  }

  
}
