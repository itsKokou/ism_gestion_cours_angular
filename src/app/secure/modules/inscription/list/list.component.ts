import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { RestResponse } from '../../../../core/models/rest.response';
import { InscriptionList } from '../../../../core/models/inscription';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { InscriptionServiceImpl } from '../../../../core/services/impl/inscription.service.impl';
import { ClasseList } from '../../../../core/models/classe';
import { AnneeScolaireList } from '../../../../core/models/annee.scolaire';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {

  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<InscriptionList[]>;

  constructor(
    private classeService: ClasseServiceImpl,
    private inscriptionService: InscriptionServiceImpl,
  ) {}

  classeSelected: number=0;
  dateChoisi: string="";
  classes?:RestResponse<ClasseList[]> ;
  anneeEncours!:AnneeScolaireList;

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    this.inscriptionService.findAllWithFilter(page,this.anneeEncours.id,this.classeSelected,this.dateChoisi).subscribe((data) => {
      this.response = data
      this.dataPagination.currentPage = data.currentPage!
      this.dataPagination.hasNext = data.hasNext!
      this.dataPagination.hasPrev = data.hasPrev!
      this.dataPagination.pages = data.pages! 
      this.dataPagination.totalPages = data.totalPages!
    }); 
  }

  filterByDate(date: string) {
    this.dateChoisi = date;
    this.refresh();
  }

  filterByClasse(idClasse: number) {
    this.classeSelected = idClasse;
    this.refresh();
  }

  archiverInscription(id: number) {
    Swal.fire(
      {
        title: "Archiver Inscription",
        text: `Souhaitez-vous confirmer l'archivage de cette inscription ?`,
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
        this.inscriptionService.archivateInscription("Archiver",id).subscribe(() =>{
          this.refresh()
        });
      }else if(!result.isConfirmed){
          //Pas confirmer;
      }
    });
  }

  ngOnInit(): void {
    this.anneeEncours = JSON.parse(localStorage.getItem("anneeEncours")!);
    this.refresh();
    this.classeService.findAllList().subscribe((data)=>this.classes=data);
    
  }

}