import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { DetailClasse, DetailModule } from "../models/detail";
import { ProfesseurCreate, ProfesseurList } from "../models/professeur";
import { BaseService } from "./base.service";
import { Enseignement } from "../models/enseignement";

export interface ProfesseurService extends BaseService<ProfesseurList,ProfesseurCreate> { 
    findAllWithFilterAndPlanifier(page: number, module: number, grade: string, portable:string, planifier:boolean): Observable<RestResponse<ProfesseurList[]>>;
    findDetailClasse(id: number): Observable<RestResponse<DetailClasse>>;
    findDetailModule(id: number): Observable<RestResponse<DetailModule>>;
    findDetailModule(id: number): Observable<RestResponse<DetailModule>>;
    findAllGrade(): Observable<RestResponse<string[]>>;
    makeAffectation(enseignements: Enseignement[]): Observable<RestResponse<Enseignement[]>>;
    findAllList(): Observable<RestResponse<ProfesseurList[]>>;
    findByModule(idModule:number): Observable<RestResponse<ProfesseurList[]>>;
    planifierProfesseur(id:number): Observable<RestResponse<string>>;
}
