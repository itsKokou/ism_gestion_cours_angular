import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { AbsenceList } from '../../../../core/models/absence';
import { RestResponse } from '../../../../core/models/rest.response';
import { AbsenceServiceImpl } from '../../../../core/services/impl/absence.service.impl';
import { AnneeScolaireList } from '../../../../core/models/annee.scolaire';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {

  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<AbsenceList[]>;
  anneeEncours!: AnneeScolaireList;

  constructor(
    private absenceService: AbsenceServiceImpl,
  ) {}

  matriculeSaisi: string="";

  paginate(page: number) {
    this.refresh(page)
  }

  searchByEtudiant(mat: string) {
    if(mat.length==6 || mat.length==0){
      this.matriculeSaisi=mat;
      this.refresh();
    }
  }

  refresh(page:number=0){
    this.absenceService.findAll(page,this.matriculeSaisi).subscribe((data) => {
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
