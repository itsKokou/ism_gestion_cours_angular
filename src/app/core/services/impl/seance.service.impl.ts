import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { EtudiantCreate, EtudiantList, InscritList } from '../../models/etudiant';
import { EtudiantService } from '../etudiant.service';
import { DetailAbsence, DetailDossier } from '../../models/detail';
import { SeanceService } from '../seance.service';
import { SeanceCreate, SeanceList } from '../../models/seance';
import { ProfesseurList } from '../../models/professeur';
import { SalleList } from '../../models/salle';

@Injectable({
  providedIn: 'root'
})
export class SeanceServiceImpl implements SeanceService {

  private ApiUrl = `${environment.APIURL}/seances`;

  constructor(private http: HttpClient) {}

  findSalleDisponibles(idCours: number, date: string, heureD: string, heureF: string): Observable<RestResponse<SalleList[]>> {
    return this.http.get<RestResponse<SalleList[]>>(`${this.ApiUrl}/salle/disponible/${idCours}/${date}/${heureD}/${heureF}`);
  }

  findProfDisponibles(idCours: number, date: string, heureD: string, heureF: string): Observable<RestResponse<ProfesseurList[]>> {
    return this.http.get<RestResponse<ProfesseurList[]>>(`${this.ApiUrl}/professeur/disponible/${idCours}/${date}/${heureD}/${heureF}`);
  }

  checkProfDisponibility(idCours: number, date: string, heureD: string, heureF: string): Observable<RestResponse<boolean>> {
    return this.http.get<RestResponse<boolean>>(`${this.ApiUrl}/professeur/disponibilite/${idCours}/${date}/${heureD}/${heureF}`); 
  }

  checkClasseDisponibility(idCours: number, date: string, heureD: string, heureF: string): Observable<RestResponse<boolean>> {
    return this.http.get<RestResponse<boolean>>(`${this.ApiUrl}/classe/disponibilite/${idCours}/${date}/${heureD}/${heureF}`);
  }

  findAll(professeur: number, classe: number,couleur:number): Observable<RestResponse<SeanceList[]>> {
    return this.http.get<RestResponse<SeanceList[]>>(`${this.ApiUrl}?professeur=${professeur}&classe=${classe}&couleur=${couleur}`); 
  }

  create(dataCreate: SeanceCreate): Observable<RestResponse<SeanceCreate>> {
    return this.http.post<RestResponse<SeanceCreate>>(`${this.ApiUrl}`, dataCreate);
  }
}
