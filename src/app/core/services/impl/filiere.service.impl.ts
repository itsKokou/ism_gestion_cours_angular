import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { FiliereService } from '../filiere.service';
import { Filiere } from '../../models/filiere';

@Injectable({
  providedIn: 'root'
})
export class FiliereServiceImpl implements FiliereService {

  private ApiUrl = `${environment.APIURL}/filieres`;

  constructor(private http: HttpClient) {}

  findById(id: number): Observable<RestResponse<Filiere>> {
    return this.http.get<RestResponse<Filiere>>(`${this.ApiUrl}/${id}`); 
  }

  findAll(): Observable<RestResponse<Filiere[]>> {
    return this.http.get<RestResponse<Filiere[]>>(`${this.ApiUrl}`);
  }
}
