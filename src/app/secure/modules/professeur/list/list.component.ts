import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { Router, RouterLink } from '@angular/router';
import { ProfesseurServiceImpl } from '../../../../core/services/impl/professeur.service.impl';
import { DetailClasse, DetailModule } from '../../../../core/models/detail';
import { ProfesseurList } from '../../../../core/models/professeur';
import { AnneeScolaireList } from '../../../../core/models/annee.scolaire';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { RestResponse } from '../../../../core/models/rest.response';
import { ModuleServiceImpl } from '../../../../core/services/impl/module.service.impl';
import { ModuleList } from '../../../../core/models/module';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent, RouterLink, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {

  anneeEncours!:AnneeScolaireList;
  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<ProfesseurList[]>;
  modules!: ModuleList[];
  grades!: string[];
  gradeSelected:string="";
  moduleSelected:number=0;
  portableSaisi:string="";
  detailModule!:DetailModule;
  detailClasse!:DetailClasse;
  mode:String = localStorage.getItem('mode')!;

  constructor(
    private professeurService: ProfesseurServiceImpl,
    private moduleService: ModuleServiceImpl,
    private router: Router
  ) {}

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    let planifier: boolean = this.mode=='NORMAL';
    this.professeurService.findAllWithFilterAndPlanifier(page,this.moduleSelected,this.gradeSelected,this.portableSaisi,planifier).subscribe((data) => {
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

  planifierProfesseur(id:number){
    this.professeurService.planifierProfesseur(id).subscribe((data)=>{});
    this.reloadPage();
  }

  filterByPortable(tel: string) {
    if (tel.length>=5 || tel.length==0){
      this.portableSaisi=tel;
      this.refresh();
    }
  }

  filterByGrade(grade: string) {
    this.gradeSelected=grade;
    this.refresh();
  }

  filterByModule(idModule: number) {
    this.moduleSelected=idModule;
    this.refresh();
  }

  showDetail(idProf: number) {
    this.professeurService.findDetailClasse(idProf).subscribe((data)=>{
      this.detailClasse=data.results;
    });
    this.professeurService.findDetailModule(idProf).subscribe((data)=>{
      this.detailModule=data.results;
    });
    var listTr1="";
    setTimeout(() => {
      for (let index = 0; index < this.detailClasse.classes.length; index++) {
        listTr1+= `<tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3 text-sm">${this.detailClasse.classes[index].id}</td>
                    <td class="px-4 py-3 text-sm">${this.detailClasse.classes[index].libelle} </td>
                    <td class="px-4 py-3 text-sm">${this.detailClasse.classes[index].niveau.libelle} </td>
                    <td class="px-4 py-3 text-sm">${this.detailClasse.classes[index].filiere.libelle} </td>
                    <td class="px-4 py-3 text-sm">${this.detailClasse.classes[index].effectif} </td>
                  </tr>`
      }
      Swal.fire({
          width:700,
          html:`<h4 class="mb-4 mt-4 text-lg font-semibold text-gray-600 dark:text-white">
                  Liste des Classes de ${this.detailClasse.professeur}
                </h4>

                <div class="w-full overflow-hidden rounded-lg shadow-xs">
                  <div class="w-full overflow-x-auto">
                    <table class="w-full whitespace-no-wrap">
                      <thead>
                        <tr
                          class="text-sm font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                          style="color:#eb1616;"
                        >
                          <th class="px-4 py-3">N°</th>
                          <th class="px-4 py-3">Libellé</th>
                          <th class="px-4 py-3">Niveau</th>
                          <th class="px-4 py-3">Filière</th>
                          <th class="px-4 py-3">Effectif</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
                        `+ listTr1+ `
                      </tbody>
                    </table>
                  </div>`,
          confirmButtonText:"Modules",
          confirmButtonColor:'#22d3ee',
          showConfirmButton: true,
          denyButtonText:"Fermer",denyButtonColor:'#f87171',showDenyButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          var listTr2="";
          for (let index = 0; index < this.detailModule.modules.length; index++) {
            listTr2+= `<tr class="text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3 text-sm">${this.detailModule.modules[index].id}</td>
                        <td class="px-4 py-3 text-sm">${this.detailModule.modules[index].libelle} </td>
                      </tr>`
          }

          Swal.fire({
            width:700,
            html: `<h4 class="mb-4 mt-4 text-lg font-semibold text-gray-600 dark:text-white">
                    Liste des Modules de ${this.detailModule.professeur}
                  </h4>

                  <div class="w-full overflow-hidden rounded-lg shadow-xs">
                    <div class="w-full overflow-x-auto">
                      <table class="w-full whitespace-no-wrap">
                        <thead>
                          <tr
                            class="text-sm font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                            style="color:#eb1616;"
                          >
                            <th class="px-4 py-3">N°</th>
                            <th class="px-4 py-3">Libellé</th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
                        `+listTr2 +`
                        </tbody>
                      </table>
                    </div>` ,
              showCancelButton:false,
            confirmButtonText:"Fermer",
            confirmButtonColor:'#f87171',
            showConfirmButton: true
          });
        }
      });
    }, 100);

  }

  
  ngOnInit(): void {
    this.anneeEncours=JSON.parse(localStorage.getItem( "anneeEncours")!);
    // console.log(localStorage.getItem( "anneeEncours"))
    this.refresh();
    this.professeurService.findAllGrade().subscribe((data)=>{this.grades=data.results});
    this.moduleService.findAllList().subscribe((data)=>this.modules=data.results)
  }
  
}
