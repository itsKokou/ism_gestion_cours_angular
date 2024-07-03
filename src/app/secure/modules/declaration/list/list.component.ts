import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { DeclarationList } from '../../../../core/models/declaration';
import { RestResponse } from '../../../../core/models/rest.response';
import { AnneeScolaireList } from '../../../../core/models/annee.scolaire';
import { DeclarationServiceImpl } from '../../../../core/services/impl/declaration.service.impl';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {

  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<DeclarationList[]>;
  anneeEncours!: AnneeScolaireList;

  constructor(
    private declarationService: DeclarationServiceImpl,
  ) {}

  etatChoisi: string="Enattente";

  paginate(page: number) {
    this.refresh(page)
  }

  filterByEtat(etat: string) {
    this.etatChoisi=etat;
    this.refresh();
  }

  traiterDeclaration(id: number,userId: number,seanceId: number,action: string) {
    var title='';
    var text='';
    if(action==="accepter"){
      title= "Accepter la demande";
      text = "l'acceptation"
    }else{
      title= "Refuser la demande";
      text = "le refus"
    }

    Swal.fire(
      {
        title: title,
        text: `Souhaitez-vous confirmer ${text} de cette demande ?`,
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
        this.declarationService.traiterDeclaration(id,userId,seanceId,action).subscribe((data)=>{});
        this.refresh()
      }else if(!result.isConfirmed){
          //Pas confirmer;
      }
    });
  }

  refresh(page:number=0){
    this.declarationService.findAll(page,this.etatChoisi).subscribe((data) => {
      this.response = data
      this.dataPagination.currentPage = data.currentPage!
      this.dataPagination.hasNext = data.hasNext!
      this.dataPagination.hasPrev = data.hasPrev!
      this.dataPagination.pages = data.pages! 
      this.dataPagination.totalPages = data.totalPages!
    }); 
  }

  ngOnInit(): void {
    this.refresh();
    this.anneeEncours=JSON.parse(localStorage.getItem( "anneeEncours")!);
  }
}
