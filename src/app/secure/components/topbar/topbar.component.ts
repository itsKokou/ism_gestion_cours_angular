import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AnneeScolaireServiceImpl } from '../../../core/services/impl/annee-scolaire.service.impl';
import { RestResponse } from '../../../core/models/rest.response';
import { AnneeScolaireList } from '../../../core/models/annee.scolaire';
import { ClasseList } from '../../../core/models/classe';
import { ProfesseurList } from '../../../core/models/professeur';
import { ClasseServiceImpl } from '../../../core/services/impl/classe.service.impl';
import { ProfesseurServiceImpl } from '../../../core/services/impl/professeur.service.impl';
import { AuthentificateService } from '../../../core/services/auth/authentificate.service';
import { User } from '../../../core/models/authentification';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {

  isNotificationsMenuOpen: Boolean = false
  isProfileMenuOpen: Boolean = false
  annees: AnneeScolaireList[] = JSON.parse(localStorage.getItem("annees")!);
  anneeEncours:AnneeScolaireList = JSON.parse(localStorage.getItem("anneeEncours")!);
  isAnnee!:Boolean;
  isSeance!:Boolean;
  classes!:ClasseList[];
  professeurs!:ProfesseurList[];
  classeSeance:number= +localStorage.getItem("classeSeance")!;
  professeurSeance:number=+localStorage.getItem("professeurSeance")!;
  couleurSeance:number=+localStorage.getItem("couleurSeance")!;
  connectedUser:User=JSON.parse(localStorage.getItem('connectedUser')!);

  constructor(
    private router : Router,
    private anneeService : AnneeScolaireServiceImpl,
    private classeService: ClasseServiceImpl,
    private profService: ProfesseurServiceImpl,
    private authService: AuthentificateService
  ) {
    
  }

  logout() {
    this.authService.isAuthentificated = false;
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  toggleNotificationsMenu() {
    this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen
  }

  closeNotificationsMenu() {
    this.isNotificationsMenuOpen = false
  }
  
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen
  }

  closeProfileMenu() {
    this.isProfileMenuOpen = false
  }

  activeAnnee(): boolean {
    var url = this.router.url;
    if (url ==="/admin/etudiant" || url==="/admin/inscription" || url==="/admin/cours") {
      return true;
    }
    return false;
  }

  activeSeanceFilter(){
    var url = this.router.url;
    return url ==="/admin/seance";
  }

  reloadPage(): void {
    var url = this.router.url;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`${url}`])
    })
  }

  changeAnneeEncours(idAnnee: number) {
    for (let index = 0; index < this.annees.length; index++) {
      if (this.annees[index].id===idAnnee) {
        this.anneeEncours=this.annees[index];
        localStorage.setItem("anneeEncours",JSON.stringify(this.anneeEncours));
        break;
      }
    }
    this.reloadPage();
  }

  changeCouleur(idCouleur: string) {
    localStorage.setItem("couleurSeance",idCouleur);
    this.reloadPage();
  }

  changeClasse(idClasse: string) {
    localStorage.setItem("classeSeance",idClasse);
    this.reloadPage();
  }

  changeProfesseur(idProf: string) {
    localStorage.setItem("professeurSeance",idProf);
    this.reloadPage();
  }

  reidrectToLoginIfNotAuthenticated(){
    if(localStorage.getItem('token')==null){
      this.router.navigateByUrl('/login');
    }
  }

  changeMode(){
    let mode : string = localStorage.getItem('mode')!;
    if(mode=="NORMAL"){
      localStorage.setItem('mode','PLANIFIER');
    }else if(mode=="PLANIFIER"){
      localStorage.setItem('mode','NORMAL');
    }
    this.reloadPage();
  }
  
  ngOnInit(): void {
    
    this.isSeance = this.activeSeanceFilter()
    this.isAnnee = this.activeAnnee();
    this.reidrectToLoginIfNotAuthenticated();
    // Souscrire aux événements de changement d'URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Appeler la fonction à chaque changement d'URL
        this.isAnnee = this.activeAnnee();
        //Seance
        this.isSeance = this.activeSeanceFilter()
        //Rediriger vers login si pas connecté
        this.reidrectToLoginIfNotAuthenticated();
      }
    });

    if (this.connectedUser.roles.includes('ROLE_PROFESSEUR')) {
      this.profService.findDetailClasse(this.connectedUser.userId).subscribe((data)=>this.classes=data.results.classes);
    } else {
      this.classeService.findAllList().subscribe((data)=>this.classes=data.results);
    }
    
    this.profService.findAllList().subscribe((data)=>this.professeurs=data.results); 

  }
}
