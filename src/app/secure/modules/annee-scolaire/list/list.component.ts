import { Component, OnInit } from '@angular/core';
import { AnneeScolaireList } from '../../../../core/models/annee.scolaire';
import { RestResponse } from '../../../../core/models/rest.response';
import { AnneeScolaireServiceImpl } from '../../../../core/services/impl/annee-scolaire.service.impl';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<AnneeScolaireList[]>;
  constructor(private anneeScolaireService: AnneeScolaireServiceImpl) {}

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    this.anneeScolaireService.findAll(page).subscribe((data) => {
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
  }
}
