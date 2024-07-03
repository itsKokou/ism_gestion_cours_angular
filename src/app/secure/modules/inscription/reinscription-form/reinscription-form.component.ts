import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClasseList } from '../../../../core/models/classe';
import { RestResponse } from '../../../../core/models/rest.response';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { InscriptionServiceImpl } from '../../../../core/services/impl/inscription.service.impl';
import { Reinscription } from '../../../../core/models/inscription';
import { EtudiantServiceImpl } from '../../../../core/services/impl/etudiant.service.impl';

@Component({
  selector: 'app-reinscription-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reinscription-form.component.html',
  styleUrl: './reinscription-form.component.css',
})
export class ReinscriptionFormComponent implements OnInit{

  form = this.fb.group({
    id: [0, [Validators.required,Validators.min(1)]],
    matricule: ['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required,Validators.minLength(5)]],
    nomComplet: ['',[Validators.required, Validators.minLength(5)]],
    tuteur: ['',[Validators.required, Validators.minLength(4)]],
    classe:[0,[Validators.required,Validators.min(1)]],
  });

  get id() {
    return this.form.controls['id'] as FormControl;
  }
  get email() {
    return this.form.controls['email'] as FormControl;
  }
  get password() {
    return this.form.controls['password'] as FormControl;
  }
  get matricule() {
    return this.form.controls['matricule'] as FormControl;
  }
  get nomComplet() {
    return this.form.controls['nomComplet'] as FormControl;
  }
  get tuteur() {
    return this.form.controls['tuteur'] as FormControl;
  }
  get classe() {
    return this.form.controls['classe'] as FormControl;
  }


  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;
  classesList?:RestResponse<ClasseList[]> ;
  reinscription!: Reinscription

  constructor(
    private fb: FormBuilder,
    private service: InscriptionServiceImpl,
    private classeService: ClasseServiceImpl,
    private etudiantService: EtudiantServiceImpl
  ) {
    
  }

  searchEtudiant(mat: string) {
    
    if(mat.length==6){
      this.etudiantService.findByMatricule(mat).subscribe((data)=>{
          this.id.setValue(data.results.id);
          this.nomComplet.setValue(data.results.nomComplet);
          this.email.setValue(data.results.email);
          this.tuteur.setValue(data.results.tuteur);
      });
    }else{
      this.id.reset();
      this.nomComplet.reset();
      this.email.reset();
      this.tuteur.reset();
    }
  }

  onSubmit() {
    const { ...formData} = this.form.value;
    if (!this.isEdit) {
      this.service.makeReinscription(formData).subscribe((data) => {
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
    console.log(formData);
  }


  ngOnInit(): void {
    this.classeService.findAllList().subscribe((data)=>this.classesList=data);
  }
}

  
