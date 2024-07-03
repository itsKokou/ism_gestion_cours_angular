import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from 'fullcalendar';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { SeanceServiceImpl } from '../../../../core/services/impl/seance.service.impl';
import { EtudiantServiceImpl } from '../../../../core/services/impl/etudiant.service.impl';
import { InscritList } from '../../../../core/models/etudiant';
import Swal from 'sweetalert2';
import { User } from '../../../../core/models/authentification';
import { SeanceList } from '../../../../core/models/seance';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit{

  constructor (
    private seanceService:SeanceServiceImpl,
    private etudiantService:EtudiantServiceImpl,
    private router :Router
  ) {}

  seances!:any[];
  classeSelected:number=0;
  profSelected:number=0;
  couleurSelected:number=0;

  connectedUser:User=JSON.parse(localStorage.getItem('connectedUser')!);

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins : [timeGridPlugin,dayGridPlugin],
    locale : 'fr',
    timeZone : 'Africa/Senegal',
    slotMinTime : '08:00:00',
    slotMaxTime : '20:00:00',
    firstDay : 1,
    views: {
        dayGridMonth: { buttonText: "Mois" },
        timeGridWeek: { buttonText: "Semaine" },
        timeGridDay: { buttonText: "Jour" }
    },
    headerToolbar : {
      start : "prev,next today",
      center : 'title',
      end : 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    eventClick : this.handleEventClick.bind(this),
    allDaySlot: false,
    
    eventContent: function(arg) {           
      return {
          html: arg.timeText + '</b><br> '+ '</b> <b>' + arg.event.title + '</b><br>' + arg.event.extendedProps['description'] + '</b><br>' + arg.event.extendedProps['location'] //+ '</b><br> ' + buttonHtml
      };
    }
  };

  findSeanceById(id:number){
    var seanceList: SeanceList[] = this.seances;
    for (let index = 0; index < seanceList.length; index++) {
      if(seanceList[index].id ==id){
        return this.seances[index] ;
      }
    }
    return null;
  }

  onSubmit(){
    alert('OKKKAYY')
  }

  MakeProfDeclaration(seanceId:number){
    localStorage.setItem('seanceId',seanceId.toString());
    this.router.navigateByUrl('/admin/declaration/form');
  }

  handleEventClick(event: EventClickArg) {
    // Récupérez l'ID de l'événement
    var seanceId = event.event.id;
    var listEtudiants:InscritList[];
    this.etudiantService.findBySeance(+seanceId).subscribe((data)=>{
      listEtudiants = data.results;
    
      var listTr="";
      for (let index = 0; index < listEtudiants.length; index++) {
        listTr += 
        `<tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">${listEtudiants[index].id}</td>
          <td class="px-4 py-3 text-sm">${listEtudiants[index].matricule}</td>
          <td class="px-4 py-3 text-sm">${listEtudiants[index].nomComplet}</td>
          <td class="px-4 py-3 text-sm">${listEtudiants[index].email}</td>
          <td class="px-4 py-3 text-sm">${listEtudiants[index].classe}</td>
        </tr>`
        
      }

      //Recuperer la seance et tester sur sa couleur pour savoir si c'est fini ou pas
      var seance:SeanceList = this.findSeanceById(+seanceId);
      var isDemande = seance.color === "#F53558"; //si oui la seance n'est pas encore passé
      if (this.connectedUser.roles.includes('ROLE_PROFESSEUR') && isDemande) {
        Swal.fire({
        width:900,
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <body>
        <h4 class="mb-4 mt-4 text-lg font-semibold text-gray-600 dark:text-white">
            Liste des Etudiants 
        </h4>

        <div class="w-full overflow-hidden rounded-lg shadow-xs">
            <div class="w-full overflow-x-auto">
              <table class="w-full whitespace-no-wrap">
                <thead>
                  <tr class="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-900" style="color:#eb1616;">
                    <th class="px-4 py-3">N°</th>
                    <th class="px-4 py-3">Matricule</th>
                    <th class="px-4 py-3">Nom et Prénoms</th>
                    <th class="px-4 py-3">Email</th>
                    <th class="px-4 py-3">Classe</th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white text-left divide-y dark:divide-gray-700 dark:bg-gray-900"
                >
                `+listTr+`
                </tbody>
              </table>
            </div>
        </div>
          
        </body>
        </html>
        `,
        confirmButtonText:"Faire demande",
        confirmButtonColor:'#22d3ee',
        showConfirmButton: true,
        denyButtonText:"Fermer",denyButtonColor:'#f87171',showDenyButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.MakeProfDeclaration(+seanceId);
        }
      });
      } else {
        Swal.fire({
        width:900,
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <body>
        <h4 class="mb-4 mt-4 text-lg font-semibold text-gray-600 dark:text-white">
            Liste des Etudiants 
        </h4>

        <div class="w-full overflow-hidden rounded-lg shadow-xs">
            <div class="w-full overflow-x-auto">
              <table class="w-full whitespace-no-wrap">
                <thead>
                  <tr class="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-900" style="color:#eb1616;">
                    <th class="px-4 py-3">N°</th>
                    <th class="px-4 py-3">Matricule</th>
                    <th class="px-4 py-3">Nom et Prénoms</th>
                    <th class="px-4 py-3">Email</th>
                    <th class="px-4 py-3">Classe</th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white text-left divide-y dark:divide-gray-700 dark:bg-gray-900"
                >
                `+listTr+`
                </tbody>
              </table>
            </div>
        </div>
          
        </body>
        </html>
        `,
        confirmButtonText:"Fermer",confirmButtonColor:'#f87171',showConfirmButton: true
      });
      }
    });

    
  }
  
  refresh(){
    this.seanceService.findAll(this.profSelected,this.classeSelected,this.couleurSelected).subscribe((data)=>{
      this.seances=data.results;
      //this.calendarOptions.events=this.seances as any[];
    });
  }
  
  ngOnInit(): void {
    this.classeSelected = +localStorage.getItem('classeSeance')!;
    this.profSelected = +localStorage.getItem('professeurSeance')!;
    this.couleurSelected = +localStorage.getItem('couleurSeance')!;
    this.refresh();
  }

}
