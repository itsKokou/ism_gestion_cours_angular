import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { Filiere } from "../models/filiere";

export interface FiliereService {
  findAll(): Observable<RestResponse<Filiere[]>>;
  findById(id: number): Observable<RestResponse<Filiere>>;
}
