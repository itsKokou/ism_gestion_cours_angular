import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { RestResponse } from '../../../../core/models/rest.response';
import { CoursList } from '../../../../core/models/cours';
import { ModuleServiceImpl } from '../../../../core/services/impl/module.service.impl';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { CoursServiceImpl } from '../../../../core/services/impl/cours.service.impl';
import { SemestreServiceImpl } from '../../../../core/services/impl/semestre.service.impl';
import { ClasseList } from '../../../../core/models/classe';
import { SemestreList } from '../../../../core/models/semestre';
import { AnneeScolaireList } from '../../../../core/models/annee.scolaire';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../../core/models/authentification';
import { ProfesseurServiceImpl } from '../../../../core/services/impl/professeur.service.impl';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,CommonModule,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {

  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<CoursList[]>;

  connectedUser:User=JSON.parse(localStorage.getItem("connectedUser")!);
  profId:number=0;

  constructor(
    private classeService: ClasseServiceImpl,
    private coursService: CoursServiceImpl,
    private semestreService: SemestreServiceImpl,
    private profService:ProfesseurServiceImpl
  ) {}

  classeSelected: number=0;
  semestreSelected: number=0;
  etatSelected: string="";
  classes?:ClasseList[] ;
  semestres?:RestResponse<SemestreList[]> ;
  anneeEncours!:AnneeScolaireList;

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    this.coursService.findAllWithFilter(page,this.etatSelected,this.classeSelected,this.semestreSelected,this.profId).subscribe((data) => {
      this.response = data
      this.dataPagination.currentPage = data.currentPage!
      this.dataPagination.hasNext = data.hasNext!
      this.dataPagination.hasPrev = data.hasPrev!
      this.dataPagination.pages = data.pages! 
      this.dataPagination.totalPages = data.totalPages!
    }); 
  }

  filterByEtat(etat: string) {
    this.etatSelected = etat;
    this.refresh();
  }

  filterByClasse(idClasse: number) {
    this.classeSelected = idClasse;
    this.refresh();
  }

  filterBySemestre(idSem: number) {
    this.semestreSelected = idSem;
    this.refresh();
  }

  archiverCours(id: number) {
    Swal.fire(
      {
        title: "Archiver Cours",
        text: `Souhaitez-vous confirmer l'archivage de ce cours ?`,
        icon: 'warning',
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText : "Non, Annuler",
        showDenyButton: true,
        denyButtonText : "Oui, Confirmer",
        reverseButtons: true
      }
    ).then((result) => {
      if (result.isDenied) {
        this.coursService.archivateCours("Archiver",id).subscribe(() =>{
          this.refresh()
        });
      }else if(!result.isConfirmed){
          //Pas confirmer;
      }
    });
  }

  ngOnInit(): void {
    if (this.connectedUser.roles.includes("ROLE_PROFESSEUR")) {
      this.profId = this.connectedUser.userId;
    } else {
      this.profId = 0;
    }
    this.refresh();
    this.anneeEncours = JSON.parse(localStorage.getItem("anneeEncours")!);
    this.semestreService.findAllList().subscribe((data)=>this.semestres=data);
    if (this.connectedUser.roles.includes('ROLE_PROFESSEUR')) {
      this.profService.findDetailClasse(this.connectedUser.userId).subscribe((data)=>this.classes=data.results.classes);
    } else {
      this.classeService.findAllList().subscribe((data)=>this.classes=data.results);
    }
    
  }

}