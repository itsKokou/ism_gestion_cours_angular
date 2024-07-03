import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { AbsenceList } from "../models/absence";

export interface AbsenceService {
    findAll(page:number,mat:string): Observable<RestResponse<AbsenceList[]>>;
}
