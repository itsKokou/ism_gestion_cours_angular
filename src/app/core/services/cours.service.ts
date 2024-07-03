
import { Observable } from "rxjs";
import { CoursCreate, CoursList } from "../models/cours";
import { RestResponse } from "../models/rest.response";
import { BaseService } from "./base.service";

export interface CoursService extends BaseService<CoursList,CoursCreate>{ 
    findAllWithFilter(page:number,etat:string,classe:number,semestre:number,prof:number): Observable<RestResponse<CoursList[]>>;
    archivateCours(msg: string, id:number): Observable<RestResponse<string>>
}
