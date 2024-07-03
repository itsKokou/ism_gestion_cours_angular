import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestResponse } from '../../../../core/models/rest.response';
import { ClasseList } from '../../../../core/models/classe';
import { InscriptionServiceImpl } from '../../../../core/services/impl/inscription.service.impl';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{

  form = this.fb.group({
    id: new FormControl(),
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required,Validators.minLength(5)]],
    nomComplet: ['',[Validators.required, Validators.minLength(5)]],
    tuteur: ['',[Validators.required, Validators.minLength(4)]],
    photo: ['test.jpg'], 
    classe:[0,[Validators.required,Validators.min(1)]],
    isArchived: [false]
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
  get isArchived() {
    return this.form.controls['isArchived'] as FormControl;
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
  get photo() {
    return this.form.controls['photo'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;
  classesList?:RestResponse<ClasseList[]> ;

  constructor(
    private fb: FormBuilder,
    private service: InscriptionServiceImpl,
    private classeService: ClasseServiceImpl
  ) {
    
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
    
    console.log(formData);
    
  }


  ngOnInit(): void {
    this.classeService.findAllList().subscribe((data)=>this.classesList=data);
  }
}

  
