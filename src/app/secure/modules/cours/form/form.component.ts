import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClasseList } from '../../../../core/models/classe';
import { RestResponse } from '../../../../core/models/rest.response';
import { SemestreList } from '../../../../core/models/semestre';
import { ModuleList } from '../../../../core/models/module';
import { ProfesseurList } from '../../../../core/models/professeur';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursServiceImpl } from '../../../../core/services/impl/cours.service.impl';
import { SemestreServiceImpl } from '../../../../core/services/impl/semestre.service.impl';
import { ModuleServiceImpl } from '../../../../core/services/impl/module.service.impl';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { ProfesseurServiceImpl } from '../../../../core/services/impl/professeur.service.impl';
import { Select2Module } from 'ng-select2-component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,Select2Module],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{

  form = this.fb.group({
    id: new FormControl(),
    semestre: [0, [Validators.required,Validators.min(1)]],
    module: [0,[Validators.required,Validators.min(1)]],
    professeur:[0,[Validators.required,Validators.min(1)]],
    nbreHeureTotal:[0,[Validators.required, Validators.min(12)]],
    classes: [,[Validators.minLength(1)]],
    isArchived: [false]
  });

  get id() {
    return this.form.controls['id'] as FormControl;
  }
  get semestre() {
    return this.form.controls['semestre'] as FormControl;
  }
  get module() {
    return this.form.controls['module'] as FormControl;
  }
  get isArchived() {
    return this.form.controls['isArchived'] as FormControl;
  }
  get nbreHeureTotal() {
    return this.form.controls['nbreHeureTotal'] as FormControl;
  }
  get professeur() {
    return this.form.controls['professeur'] as FormControl;
  }
  get classes() {
    return this.form.controls['classes'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;
  classesList?:RestResponse<ClasseList[]> ;
  semestres?:RestResponse<SemestreList[]> ;
  modules?:RestResponse<ModuleList[]> ;
  professeurs?:RestResponse<ProfesseurList[]>;
  //SELECT2
  overlay=false;
  dataClasses:any=[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: CoursServiceImpl,
    private semestreService: SemestreServiceImpl,
    private moduleService: ModuleServiceImpl,
    private classeService: ClasseServiceImpl,
    private professeurService: ProfesseurServiceImpl,
    private router: Router
  ) {
    this.classes.valueChanges.subscribe((val)=>{
      console.log(val);
      
    });
  }

  findClasseById(id:number){
    for (let index = 0; index < this.classesList?.results.length!; index++) {
      if(this.classesList?.results[index].id == id){
        var {...temp} = this.classesList?.results[index];
        return  temp;
      } 
    };
    return null;
  }

  findSemestreById(id:number){
    for (let index = 0; index < this.semestres?.results.length!; index++) {
      if(this.semestres?.results[index].id == id){
        var {...temp} = this.semestres?.results[index];
        return  temp;
      } 
    };
    return null;
  }

  onSubmit() {
    const { ...formData} = this.form.value;
    if (!this.isEdit) {
      this.service.create(formData).subscribe((data) => {
        if (data.statuts == 201) {
          this.form.reset();
          this.echec=null;
          this.success = 'Enregistrement effectué avec succès';
          setTimeout(() => {this.success = null;}, 3000);
        } else {
          this.echec = "Erreur d'enregistrement";
        }
      });
    }
  }

  chooseModule() {
    var id = +this.module.value;
    this.professeurService.findByModule(id).subscribe((data)=>this.professeurs=data);
    this.dataClasses = [];
  }

  chooseProfesseur() {
    var idModule = +this.module.value;
    var idProf = +this.professeur.value;
    var idSem = +this.semestre.value;
    this.dataClasses = [];
    this.classes.setValue([]);
    this.classeService.findByProfesseurAndModuleAndSemestre(idProf,idModule,idSem).subscribe((data)=>{
      this.classesList=data;
      for (let index = 0; index < this.classesList?.results.length!; index++) {
        this.dataClasses.push({value:`${this.classesList?.results[index].id}`, label:`${this.classesList?.results[index].libelle}`})
      }
    });
  }

  chooseSemestre() {
    if(this.professeur.value != null || this.professeur.value!=0){
      this.chooseProfesseur();
    }
  }

  ngOnInit(): void {
    this.id_data = this.route.snapshot.paramMap.get('id')!.toString();
    this.isEdit = this.id_data == 'new' ? false : true; //Recuperer le param id de la route active
    if (this.isEdit) {
      this.router.navigateByUrl('/admin/cours');
    }

    this.semestreService.findAllList().subscribe((data)=>this.semestres=data);
    this.moduleService.findAllList().subscribe((data)=>this.modules=data);
    
    console.log(this.dataClasses);
  }
}

  
