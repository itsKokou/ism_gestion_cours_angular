import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { DeclarationCreate, DeclarationList } from "../models/declaration";

export interface DeclarationService {
    findAll(page:number,etat:string): Observable<RestResponse<DeclarationList[]>>;
    traiterDeclaration(id:number,userId:number,seanceId:number,action:string): Observable<RestResponse<string>>;
    create(dataCreate: DeclarationCreate): Observable<RestResponse<DeclarationCreate>>;
}
