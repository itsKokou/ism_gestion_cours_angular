import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestResponse } from '../../models/rest.response';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { EtudiantCreate, EtudiantList, InscritList } from '../../models/etudiant';
import { EtudiantService } from '../etudiant.service';
import { DetailAbsence, DetailDossier } from '../../models/detail';

@Injectable({
  providedIn: 'root'
})
export class EtudiantServiceImpl implements EtudiantService {

  private ApiUrl = `${environment.APIURL}/etudiants`;

  constructor(private http: HttpClient) {}

  findBySeance(seanceId: number): Observable<RestResponse<InscritList[]>> {
    return this.http.get<RestResponse<InscritList[]>>(`${this.ApiUrl}/seance/${seanceId}`); 
  }

  findByMatricule(mat: string): Observable<RestResponse<EtudiantList>> {
    return this.http.get<RestResponse<EtudiantList>>(`${this.ApiUrl}/matricule/${mat}`); 
  }
  
  findAll(page: number, annee: number, classe: number=0): Observable<RestResponse<InscritList[]>> {
    return this.http.get<RestResponse<InscritList[]>>(`${this.ApiUrl}?page=${page}&annee=${annee}&classe=${classe}`); 
  }

  findById(id: number): Observable<RestResponse<EtudiantList>> {
   return this.http.get<RestResponse<EtudiantList>>(`${this.ApiUrl}/${id}`); 
  }

  update(dataCreate: EtudiantCreate, id:number): Observable<RestResponse<EtudiantCreate>> {
    return  this.http.put<RestResponse<EtudiantCreate>>(`${this.ApiUrl}/${id}`, dataCreate);
  }  

  findDetailAbsence(id: number, annee: number): Observable<RestResponse<DetailAbsence>> {
    return this.http.get<RestResponse<DetailAbsence>>(`${this.ApiUrl}/absence/${id}/annee/${annee}`); 
  }

  findDetailDossier(id: number, annee: number): Observable<RestResponse<DetailDossier>> {
    return this.http.get<RestResponse<DetailDossier>>(`${this.ApiUrl}/dossier/${id}/annee/${annee}`); 
  }


}
