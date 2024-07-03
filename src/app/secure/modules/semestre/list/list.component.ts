import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { SemestreList } from '../../../../core/models/semestre';
import { RestResponse } from '../../../../core/models/rest.response';
import { SemestreServiceImpl } from '../../../../core/services/impl/semestre.service.impl';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit{
  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<SemestreList[]>;
  constructor(private semestreService: SemestreServiceImpl) {}

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    this.semestreService.findAll(page).subscribe((data) => {
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
