
import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { SalleCreate, SalleList } from "../models/salle";
import { BaseService } from "./base.service";

export interface SalleService extends BaseService<SalleList,SalleCreate>{ 
    findAllList(): Observable<RestResponse<SalleList[]>>;
    findAllByPlanifier(page: number, planifier:boolean): Observable<RestResponse<SalleList[]>>;
    planifierSalle(id:number): Observable<RestResponse<string>>;
}
