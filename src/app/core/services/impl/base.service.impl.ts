import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../models/rest.response';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceImpl<LIST,CREATE> implements BaseService<LIST,CREATE> {
  protected ApiUrl!:String;
  protected http!:HttpClient;

  constructor(http: HttpClient, api: String) { 
    this.http = http;
    this.ApiUrl = api;
  }

  findAll(page: number): Observable<RestResponse<LIST[]>> {
    return this.http.get<RestResponse<LIST[]>>(`${this.ApiUrl}?page= ${page}`); 
  }

  findById(id: number): Observable<RestResponse<LIST>> {
   return this.http.get<RestResponse<LIST>>(`${this.ApiUrl}/${id}`); 
  }

  create(dataCreate: CREATE): Observable<RestResponse<CREATE>> {
    return  this.http.post<RestResponse<CREATE>>(`${this.ApiUrl}`, dataCreate);
  }

  update(dataCreate: CREATE, id:number): Observable<RestResponse<CREATE>> {
    return  this.http.put<RestResponse<CREATE>>(`${this.ApiUrl}/${id}`, dataCreate);
  }  

}
