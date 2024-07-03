
import { Observable } from "rxjs";
import { ClasseCreate, ClasseList } from "../models/classe";
import { BaseService } from "./base.service";
import { RestResponse } from "../models/rest.response";

export interface ClasseService extends BaseService<ClasseList,ClasseCreate>{ 
    findAllByNiveauAndFiliereAndPlanifier(page: number,niveau:number,filiere:number, planifier:boolean): Observable<RestResponse<ClasseList[]>>;
    findAllList(): Observable<RestResponse<ClasseList[]>>;
    findByProfesseurAndModuleAndSemestre(idProf:number, idModule:number, idSemestre:number): Observable<RestResponse<ClasseList[]>>
    planifierClasse(id:number): Observable<RestResponse<string>>;
}
