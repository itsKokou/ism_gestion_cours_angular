
import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { BaseService } from "./base.service";
import { InscriptionCreate, InscriptionList, Reinscription } from "../models/inscription";

export interface InscriptionService extends BaseService<InscriptionList,InscriptionCreate>{ 
    findAllWithFilter(page:number,annee:number,classe:number,date:string): Observable<RestResponse<InscriptionList[]>>;
    archivateInscription(msg: string, id:number): Observable<RestResponse<string>>
    makeReinscription( reinscription: Reinscription): Observable<RestResponse<Reinscription>>
}
