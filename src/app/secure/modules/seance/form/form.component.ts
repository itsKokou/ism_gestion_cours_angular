import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeanceServiceImpl } from '../../../../core/services/impl/seance.service.impl';
import { ProfesseurList } from '../../../../core/models/professeur';
import { SalleList } from '../../../../core/models/salle';
import { Time } from '@angular/common';
import { SeanceCreate } from '../../../../core/models/seance';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{

  cours_id: string  = "";
  echec: String | null = null;
  success: String | null = null;
  isProfDisponible:boolean=true;//Pour imposer le choix du prof si l'autre pas dispo
  isClasseDisponible:boolean=true;//Si pas dispo on ne continue plus ou change date pour continuer
  listProfsDisponibles!:ProfesseurList[];
  listSallesDisponibles!:SalleList[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: SeanceServiceImpl,
    private router: Router
  ) {
    //Activer les champs un à un 
    this.date.statusChanges.subscribe((data)=>{
      if (data=='VALID') {
        this.heureD.enable();
        //mouvement retour
        this.heureD.reset();
        this.heureF.reset();
      }
      if(data=='INVALID'){
        //en cas de retour
        this.heureD.reset();
        this.heureD.disable();
        this.heureF.reset();
        this.heureF.disable();
        this.salle.reset();
        this.professeur.reset();
      }
    })

    this.heureD.statusChanges.subscribe((data)=>{
      if (data=='VALID') {
        this.heureF.enable();
      }
    })

  }



  form = this.fb.group({
    id: new FormControl(),
    idCours: ['',[Validators.required]],
    date: ['', [Validators.required,this.validateDate]],
    heureD: [{value:'',disabled:true}, [Validators.required,this.validateHeureD]],
    heureF: [{value:'',disabled:true}, [Validators.required,this.validateHeureF]],
    code: [{value:'',disabled:true},[this.validateCode]],
    salle: [{value:0,disabled:true},[this.validateSalle]],
    professeur: [{value:0,disabled:true}],
  });

  get id() {
    return this.form.controls['id'] as FormControl;
  }
  get date() {
    return this.form.controls['date'] as FormControl;
  }
  get heureD() {
    return this.form.controls['heureD'] as FormControl;
  }
  get heureF() {
    return this.form.controls['heureF'] as FormControl;
  }
  get code() {
    return this.form.controls['code'] as FormControl;
  }
  get salle() {
    return this.form.controls['salle'] as FormControl;
  }
  get professeur() {
    return this.form.controls['professeur'] as FormControl;
  }
  get idCours() {
    return this.form.controls['idCours'] as FormControl;
  }

  validateDate(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate: Date = new Date(control.value);
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0)
    if (selectedDate.getDay() === 0) { // 0 représente dimanche
      return { 'dateIsSunday': true };
    }
    if (selectedDate.getTime()==today.getTime()) { // 0 représente dimanche
      return { 'dateIsToday': true };
    }
    if (selectedDate<today) { // 0 représente dimanche
      return { 'dateIsPast': true };
    } 
    return null;
  }

  validateHeureD(control: AbstractControl): { [key: string]: any } | null {
    var selectedHeure: Time = {hours:0, minutes:0} ;
    const parts = control.value.split(':');
    if(control.value!='' && (isNaN(Number.parseInt(parts[0])) || isNaN(Number.parseInt(parts[1]))) ){
      return {'isNotNumber':true}
    }else{
      selectedHeure = {hours:Number(parts[0]),minutes:Number(parts[1])}
      if(selectedHeure.minutes>59 || selectedHeure.hours>23){
        return {'heureDNotValid':true}
      }
      if(control.value!='' && (selectedHeure.hours<8 || selectedHeure.hours>17) ){
        return {'heureDNotOkay':true}
      }
    }
    return null;
  }

  validateHeureF(control: AbstractControl): { [key: string]: any } | null {
    var selectedHeure: Time = {hours:0, minutes:0} ;
    const parts = control.value.split(':');
    if(control.value!='' && (isNaN(Number.parseInt(parts[0])) || isNaN(Number.parseInt(parts[1]))) ){
      return {'isNotNumber':true}
    }else{
      selectedHeure = {hours:Number(parts[0]),minutes:Number(parts[1])}
      if(selectedHeure.minutes>59 || selectedHeure.hours>23){
        return {'heureFNotValid':true}
      }
      if(control.value!='' && (selectedHeure.hours<11 || selectedHeure.hours>20) ){
        return {'heureFNotOkay':true}
      }
      const partsD = control.parent?.get('heureD')!.value!.split(':');
      var heureD:Time = {hours:Number(partsD[0]),minutes:Number(partsD[1])}
      var diff = (selectedHeure.hours*60+selectedHeure.minutes)-(heureD.hours*60+heureD.minutes);
      if(control.value!='' && (diff<180 || diff>240) ){
        return {'heureF3heureD':true}
      }
    }
    return null;
  }

  validateCode(control: AbstractControl): { [key: string]: any } | null {
    const codeSaisi:String =  control.value;
    var salleChoisi:number = control.parent?.get('salle')?.value as number;
    if (codeSaisi.trim().length==0 && salleChoisi==0){
      return {'required':true}
    }
    if(codeSaisi.trim().length<5 && codeSaisi.trim().length>0 && salleChoisi==0){
      return {'min':true}
    }
    
    return null;
  }

  validateSalle(control: AbstractControl): { [key: string]: any } | null {
    var salleChoisi:number = +control.value;
    var codeSaisi:String =  control.parent?.get('code')?.value;
    if (salleChoisi==0 && codeSaisi.trim().length==0 ){
      return {'required':true}
    }
    return null;
  }

  touchProfesseur() {
    if (this.isProfDisponible==false) {
      if(this.professeur.value==0){
        this.professeur.setErrors({'required': true })
      }else{  
        this.professeur.setErrors({'required': false })
      }
    }
  }

  effacerError(){
    this.echec=null;
  }

  touchHeureFin(){ 
    if (this.heureF.valid) {
      //Verifier si le prof est disponible et la classe aussi à la date et heure
      this.service.checkProfDisponibility(+this.cours_id,this.date.value,this.heureD.value,this.heureF.value).subscribe((data)=>{
        this.isProfDisponible = data.results;
        if(!this.isProfDisponible){
          this.echec="Le professeur n'est pas disponible. Pensez à le remplacer"
        }
      })

      this.service.checkClasseDisponibility(+this.cours_id,this.date.value,this.heureD.value,this.heureF.value).subscribe((data)=>{
        this.isClasseDisponible = data.results;
        if(!this.isClasseDisponible){
          this.echec = null;
          this.echec="Les classes ne sont pas disponibles à ces horaires"
        }else{
          this.echec = null;
          this.code.enable();
          this.salle.enable();
          this.professeur.enable();
          if (this.isProfDisponible==false) {
            this.professeur.setErrors({'required': true })
          }
          //charger les données
          this.service.findProfDisponibles(+this.cours_id,this.date.value,this.heureD.value,this.heureF.value).subscribe((data)=>{
            this.listProfsDisponibles = data.results;
          })
          this.service.findSalleDisponibles(+this.cours_id,this.date.value,this.heureD.value,this.heureF.value).subscribe((data)=>{
            this.listSallesDisponibles = data.results;
          })
        }
      })
    }
  }

  touchCode(){
    if(this.code.value.length>0 && this.salle.value==0){
      this.salle.disable();
    }else{
      this.salle.enable();
    }
  }

  touchSalle(){
    if(+this.salle.value>0 && this.code.value.length==0){
      this.code.disable();
    }else{
      this.code.enable();
    }
  }

  onSubmit() {
    const {...formData} = this.form.value;
    formData.code = this.code.value;
    formData.salle = this.salle.value;
    this.service.create(formData).subscribe((data) => {
      console.log(data.statuts);
      
      if (data.statuts == 201) {
        // this.form.reset();
        this.echec=null;
        this.success = 'Session de cours planifié avec succès';
        setTimeout(() => {this.success = null}, 3000);
        setTimeout(() => {this.router.navigateByUrl('/admin/cours');}, 4000);
      } else {
        this.echec = "Erreur d'enregistrement de la session de cours";
      }
    });
       
  }


  ngOnInit(): void {
    this.cours_id = this.route.snapshot.paramMap.get('id')!.toString();
    this.idCours.setValue(this.cours_id);
  }
}
