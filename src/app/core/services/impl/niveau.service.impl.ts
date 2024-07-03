import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { NiveauService } from '../niveau.service';
import { Niveau } from '../../models/niveau';

@Injectable({
  providedIn: 'root'
})
export class NiveauServiceImpl implements NiveauService {

  private ApiUrl = `${environment.APIURL}/niveaux`;

  constructor(private http: HttpClient) {}

  findById(id: number): Observable<RestResponse<Niveau>> {
    return this.http.get<RestResponse<Niveau>>(`${this.ApiUrl}/${id}`); 
  }

  findAll(): Observable<RestResponse<Niveau[]>> {
    return this.http.get<RestResponse<Niveau[]>>(`${this.ApiUrl}`);
  }
}
