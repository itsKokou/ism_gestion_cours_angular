import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesseurServiceImpl } from '../../../../core/services/impl/professeur.service.impl';
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
    portable: ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    grade: ['',[Validators.required]],
    isPlanned: [false],
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
  get isPlanned() {
    return this.form.controls['isPlanned'] as FormControl;
  }
  get isArchived() {
    return this.form.controls['isArchived'] as FormControl;
  }
  get nomComplet() {
    return this.form.controls['nomComplet'] as FormControl;
  }
  get portable() {
    return this.form.controls['portable'] as FormControl;
  }
  get grade() {
    return this.form.controls['grade'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;
  grades!:string[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ProfesseurServiceImpl,
    private router: Router
  ) {}

  onSubmit() {
    const { ...formData} = this.form.value;
    
    if(this.isEdit){
      this.service.update(formData,formData.id).subscribe((data) => {
        if (data.statuts == 201) {
          this.form.reset();
          this.echec=null;
          this.success = 'Modification effectuée avec succès';
          setTimeout(() => {this.success = null;}, 3000);
          setTimeout(() => {this.router.navigateByUrl('/admin/professeur');}, 4000);
        } else {
          this.echec = "Erreur de modification";
        }
      });
    }else{
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

  setDataForEdit() {
    this.service.findById(Number.parseInt(this.id_data)).subscribe((data) => {
      if (data.statuts == 204) {
        this.router.navigateByUrl('/admin/professeur');
      } else {
        this.form.setValue({
          id:data.results.id,
          email:data.results.email,
          password:'',
          nomComplet:data.results.nomComplet,
          portable:data.results.portable,
          grade: data.results.grade,
          isPlanned: true,
          isArchived:false,
        })
      }
    });
  }

  ngOnInit(): void {
    this.id_data = this.route.snapshot.paramMap.get('id')!.toString();
    this.isEdit = this.id_data == 'new' ? false : true; //Recuperer le param id de la route active
    if (this.isEdit) {
      this.setDataForEdit();
    }
    this.service.findAllGrade().subscribe((data)=>{this.grades=data.results});
  }
}