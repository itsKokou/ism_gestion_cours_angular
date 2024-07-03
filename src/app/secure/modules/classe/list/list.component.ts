import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { Router, RouterLink } from '@angular/router';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { RestResponse } from '../../../../core/models/rest.response';
import { ClasseList } from '../../../../core/models/classe';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { Niveau } from '../../../../core/models/niveau';
import { Filiere } from '../../../../core/models/filiere';
import { NiveauServiceImpl } from '../../../../core/services/impl/niveau.service.impl';
import { FiliereServiceImpl } from '../../../../core/services/impl/filiere.service.impl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,RouterLink,CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {

  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<ClasseList[]>;

  constructor(
    private classeService: ClasseServiceImpl,
    private niveauService: NiveauServiceImpl,
    private filiereService: FiliereServiceImpl,
    private router: Router
  ) {}

  niveauSelected: number=0;
  filiereSelected: number=0;
  niveaux?:RestResponse<Niveau[]> ;
  filieres?:RestResponse<Filiere[]> ;
  mode: string = localStorage.getItem('mode')!;

  paginate(page: number) {
    this.refresh(page,this.niveauSelected,this.filiereSelected)
  }

  refresh(page:number=0, niveau:number=0,filiere:number=0){
    let planifier: boolean = this.mode=='NORMAL';
    this.classeService.findAllByNiveauAndFiliereAndPlanifier(page,niveau,filiere,planifier).subscribe((data) => {
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

  planifierClasse(id:number){
    this.classeService.planifierClasse(id).subscribe((data)=>{});
    this.reloadPage();
  }

  filterByFiliere(fil: string) {
    this.filiereSelected = Number.parseInt(fil);
    this.refresh(0,this.niveauSelected,this.filiereSelected);
  }

  filterByNiveau(niv: string) {
    this.niveauSelected = Number.parseInt(niv);
    this.refresh(0,this.niveauSelected,this.filiereSelected);
  }

  ngOnInit(): void {
    this.refresh();
    this.niveauService.findAll().subscribe((data)=>this.niveaux=data);
    this.filiereService.findAll().subscribe((data)=>this.filieres=data);
  }
}

