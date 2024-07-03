import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { EtudiantCreate, EtudiantList, InscritList } from "../models/etudiant";
import { DetailAbsence, DetailDossier } from "../models/detail";

export interface EtudiantService { 
    findAll(page: number, annee: number, classe: number): Observable<RestResponse<InscritList[]>>;
    findById(id: number): Observable<RestResponse<EtudiantList>>;
    findByMatricule(mat: string): Observable<RestResponse<EtudiantList>>;
    update(dataCreate: EtudiantCreate, id:number): Observable<RestResponse<EtudiantCreate>>;
    findDetailAbsence(id: number,annee:number): Observable<RestResponse<DetailAbsence>>;
    findDetailDossier(id: number,annee:number): Observable<RestResponse<DetailDossier>>;
    findBySeance(seanceId: number): Observable<RestResponse<InscritList[]>>; 
}
