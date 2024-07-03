import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { AnneeScolaireList } from '../../../../core/models/annee.scolaire';
import { EtudiantServiceImpl } from '../../../../core/services/impl/etudiant.service.impl';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { RestResponse } from '../../../../core/models/rest.response';
import { InscritList } from '../../../../core/models/etudiant';
import { Router, RouterLink } from '@angular/router';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { ClasseList } from '../../../../core/models/classe';
import Swal from 'sweetalert2';
import { DetailAbsence, DetailDossier } from '../../../../core/models/detail';
import { DossierComponent } from '../dossier/dossier.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,RouterLink, DossierComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit{

  anneeEncours!:AnneeScolaireList;
  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<InscritList[]>;
  classes?:RestResponse<ClasseList[]>;
  classeSelected:number=0;
  detailDossier!:DetailDossier;
  detailAbsence!:DetailAbsence;

  constructor(
    private etudiantService: EtudiantServiceImpl,
    private classeService: ClasseServiceImpl,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  filterByClasse(idClasse: number) {
   this.classeSelected=idClasse;
   this.refresh()
  }

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    this.etudiantService.findAll(page,this.anneeEncours.id,this.classeSelected).subscribe((data) => {
      this.response = data
      this.dataPagination.currentPage = data.currentPage!
      this.dataPagination.hasNext = data.hasNext!
      this.dataPagination.hasPrev = data.hasPrev!
      this.dataPagination.pages = data.pages! 
      this.dataPagination.totalPages = data.totalPages!
    }); 
  }

  
  ngOnInit(): void {
    this.anneeEncours=JSON.parse(localStorage.getItem( "anneeEncours")!);
    // console.log(localStorage.getItem( "anneeEncours"))
    this.refresh();
    this.classeService.findAllList().subscribe((data)=>{
      this.classes=data;
    });
  }

  showDossier(idEtu: number) {
    this.etudiantService.findDetailDossier(idEtu,this.anneeEncours.id).subscribe((data)=>{
      this.detailDossier=data.results;

      // Créer une usine de composants pour DossierComponent
      const factory = this.resolver.resolveComponentFactory(DossierComponent);
      
      // Créer un composant dynamique
      const componentRef = factory.create(this.injector);

      // Passer les données au composant
      componentRef.instance.detailDossier = this.detailDossier;
      componentRef.instance.anneeEncours = this.anneeEncours;
      componentRef.instance.lienQrCode = `${this.detailDossier.etudiant.id} = ${this.detailDossier.etudiant.nomComplet}`;

      // Attacher le composant à l'application Angular
      this.appRef.attachView(componentRef.hostView);

      // Créer un conteneur DOM pour le composant
      const div = document.createElement('div');
      div.appendChild(componentRef.location.nativeElement);
      
      Swal.fire({
        width:900,
        html: div,
        confirmButtonText:"Fermer",
        confirmButtonColor:'#f87171',
        showConfirmButton: true,
        willClose: () => {
          // Détacher et détruire le composant quand la boîte de dialogue est fermée
          this.appRef.detachView(componentRef.hostView);
          componentRef.destroy();
        }
      });
    });
    
    // setTimeout(() => {//Retarder les instructions
      
    
      
    // }, 100);
  }

  showAbsence(idEtu: number) {
    this.etudiantService.findDetailAbsence(idEtu,this.anneeEncours.id).subscribe((data)=>{
      this.detailAbsence=data.results;

      var listTr="";
      for (let index = 0; index < this.detailAbsence.absences.length; index++) {
        listTr += `<tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3 text-sm">${this.detailAbsence.absences[index].id}</td>
                    <td class="px-4 py-3 text-sm">${this.detailAbsence.absences[index].date}</td>
                    <td class="px-4 py-3 text-sm">${this.detailAbsence.absences[index].cours}</td>
                    <td class="px-4 py-3 text-sm">${this.detailAbsence.absences[index].professeur}</td>
                    <td class="px-4 py-3 text-sm">${this.detailAbsence.absences[index].horaire}</td>
                    <td class="px-4 py-3 text-sm">${this.detailAbsence.absences[index].semestre}</td>
                  </tr>`
        
      }
      Swal.fire({
        width:900,
        html: `<!DOCTYPE html>
        <html lang="en">
        <body>
        <h4 class="mb-4 mt-4 text-lg font-semibold text-gray-500 dark:text-white">
            Les absences de ${this.detailAbsence.etudiant} en ${this.anneeEncours.libelle}
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
                    <th class="px-4 py-3">Date</th>
                    <th class="px-4 py-3">Cours</th>
                    <th class="px-4 py-3">Professeur</th>
                    <th class="px-4 py-3">Horaire</th>
                    <th class="px-4 py-3">Semestre</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900" >
                `+ listTr+`
                </tbody>
              </table>
            </div>
          </div>
        </body>
        </html>`,
        confirmButtonText:"Fermer",
        confirmButtonColor:'#f87171',
        showConfirmButton: true
      });
    });
  }
}
