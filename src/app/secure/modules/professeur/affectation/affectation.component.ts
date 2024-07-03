import { Component, OnInit } from '@angular/core';
import { ProfesseurServiceImpl } from '../../../../core/services/impl/professeur.service.impl';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesseurList } from '../../../../core/models/professeur';
import { ModuleList } from '../../../../core/models/module';
import { ClasseList } from '../../../../core/models/classe';
import { ModuleServiceImpl } from '../../../../core/services/impl/module.service.impl';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { Select2Module } from 'ng-select2-component';
import { Enseignement } from '../../../../core/models/enseignement';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-affectation',
  standalone: true,
  imports: [ReactiveFormsModule,Select2Module,CommonModule],
  templateUrl: './affectation.component.html',
  styleUrl: './affectation.component.css'
})

export class AffectationComponent implements OnInit {

  selectClasse = new FormControl('',[Validators.required]);
  selectModule = new FormControl('',[Validators.required]);

  
  //SELECT2
  overlay=false;
  dataModules:any=[];
  dataClasses:any=[];
  //
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;
  modules!: ModuleList[];
  classes!:ClasseList[];
  professeur!:ProfesseurList;
  //
  mesEnseignements:Enseignement[]=[]

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ProfesseurServiceImpl,
    private moduleService: ModuleServiceImpl,
    private classeService: ClasseServiceImpl,
    private router: Router 
  ){
    //Suivre le changement de données
    //this.selectModule.valueChanges.subscribe((value)=>console.log(value));
  }

  findClasseById(id:number){
    for (let index = 0; index < this.classes!.length; index++) {
      if(this.classes![index].id == id){
        //retirer la classe, plus selectionnable
        var {...temp} = this.classes![index];
        this.classes.splice(index,1)
        return  temp;
      } 
    };
    return null;
  }

  findModuleById(id:number){
    for (let index = 0; index < this.modules!.length; index++) {
      if(this.modules![index].id == id){
        return  this.modules![index];
      } 
    };
    return null;
  }

  addEnseignement() {
    const enseignement:Enseignement={};
    let cl = this.findClasseById(+this.selectClasse.value!);
    enseignement.classe = cl!;
    let mods:ModuleList[]=[]
    for (let index = 0; index < this.selectModule.value!.length; index++) {
      let mod = this.findModuleById(+this.selectModule.value![index]);
      mods.push(mod!);
    }
    enseignement.modules = mods;
    enseignement.professeur = this.professeur;
    this.mesEnseignements.push(enseignement); 

    this.selectClasse.reset()
    this.selectModule.reset();
    this.chargerClasseSelect(this.classes);//recharger les classes à la vue
  }

  saveEnseignements() {
    
    this.service.makeAffectation(this.mesEnseignements).subscribe((data) => {
        if (data.statuts == 201) {
          this.echec=null;
          this.success = 'Affectation de classe effectuée avec succès';
          this.classeService.findAllList().subscribe((data)=>{ //recharger les classes
            this.classes=data.results;
            this.chargerClasseSelect(this.classes);
            this.mesEnseignements = [];
          });
          setTimeout(() => {this.success = null;}, 3000);
        } else {
          this.echec = "Erreur d'affectation de classe";
        }
    });
  }

  chargerClasseSelect(classes: ClasseList[]){
    this.dataClasses = [];
    for (let index = 0; index < classes.length; index++) {
      this.dataClasses.push({value:`${classes[index].id}`, label:`${classes[index].libelle}`})
    }
  }

  ngOnInit(): void {
    this.id_data = this.route.snapshot.paramMap.get('id')!.toString();
    this.service.findById(Number.parseInt(this.id_data)).subscribe((data) => {
      if (data.statuts == 204) {
        this.router.navigateByUrl('/admin/professeur');
      } else {
        this.professeur=data.results; 
      }
    });

    //souscrire aux donnees et les formater pour select2
    this.classeService.findAllList().subscribe((data)=>{
      this.classes=data.results;
      this.chargerClasseSelect(this.classes);
    });

    this.moduleService.findAllList().subscribe((data)=>{
      this.modules=data.results;
      for (let index = 0; index < data.results.length; index++) {
        this.dataModules.push({value:`${data.results[index].id}`, label:`${data.results[index].libelle}`})
      }
    });
    
    
  }

}
