import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { Router, RouterLink } from '@angular/router';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { RestResponse } from '../../../../core/models/rest.response';
import { SalleList } from '../../../../core/models/salle';
import { SalleServiceImpl } from '../../../../core/services/impl/salle.service.impl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,RouterLink,CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit{

  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<SalleList[]>;
  mode:String = localStorage.getItem('mode')!;

  constructor(private salleService: SalleServiceImpl,private router : Router) {}

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    let planifier: boolean = this.mode=='NORMAL';
    this.salleService.findAllByPlanifier(page,planifier).subscribe((data) => {
      this.response = data
      this.dataPagination.currentPage = data.currentPage!
      this.dataPagination.hasNext = data.hasNext!
      this.dataPagination.hasPrev = data.hasPrev!
      this.dataPagination.pages = data.pages! 
      this.dataPagination.totalPages = data.totalPages!
    }); 
  }

  reloadPage(): void {
    var url = this.router.url;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`${url}`])
    })
  }

  planifierSalle(id:number){
    this.salleService.planifierSalle(id).subscribe((data)=>{});
    this.reloadPage();
  }

  ngOnInit(): void {
    this.refresh();
  }
}
