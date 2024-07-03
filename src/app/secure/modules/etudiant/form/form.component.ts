import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantServiceImpl } from '../../../../core/services/impl/etudiant.service.impl';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{
  form = this.fb.group({
    id: new FormControl(),
    matricule: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required,Validators.minLength(5)]],
    nomComplet: ['',[Validators.required, Validators.minLength(4)]],
    tuteur: ['',[Validators.required, Validators.minLength(4)]],
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
  get matricule() {
    return this.form.controls['matricule'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: EtudiantServiceImpl,
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
          setTimeout(() => {this.router.navigateByUrl('/admin/etudiant');}, 4000);
        } else {
          this.echec = "Erreur de modification";
        }
      });
    }
  }

  setDataForEdit() {
    this.service.findById(Number.parseInt(this.id_data)).subscribe((data) => {
      if (data.statuts == 204) {
        this.router.navigateByUrl('/admin/etudiant');
      } else {
        this.form.setValue({
          id:data.results.id,
          matricule:data.results.matricule,
          email:data.results.email,
          password:'',
          nomComplet:data.results.nomComplet,
          tuteur:data.results.tuteur,
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
    }else{
      this.router.navigateByUrl('/admin/etudiant');
    }
  }
}

  
