import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { Niveau } from "../models/niveau";

export interface NiveauService {
  findAll(): Observable<RestResponse<Niveau[]>>;
  findById(id: number): Observable<RestResponse<Niveau>>;
}
