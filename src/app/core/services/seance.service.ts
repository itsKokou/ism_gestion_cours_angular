import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { SeanceCreate, SeanceList } from "../models/seance";
import { SalleList } from "../models/salle";
import { ProfesseurList } from "../models/professeur";

export interface SeanceService { 
    findAll(professeur: number, classe: number,couleur:number): Observable<RestResponse<SeanceList[]>>;
    create(dataCreate: SeanceCreate): Observable<RestResponse<SeanceCreate>>;
    checkProfDisponibility(idCours: number, date: string,heureD:string,heureF:string): Observable<RestResponse<boolean>>;
    checkClasseDisponibility(idCours: number, date: string,heureD:string,heureF:string): Observable<RestResponse<boolean>>;
    findSalleDisponibles(idCours: number, date: string,heureD:string,heureF:string): Observable<RestResponse<SalleList[]>>;
    findProfDisponibles(idCours: number, date: string,heureD:string,heureF:string): Observable<RestResponse<ProfesseurList[]>>;
}
