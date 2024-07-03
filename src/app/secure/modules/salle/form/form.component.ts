import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalleServiceImpl } from '../../../../core/services/impl/salle.service.impl';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{
  form = this.fb.group({
    id: new FormControl(),
    libelle: ['', [Validators.required, Validators.minLength(3)]],
    nbrePlace: [0,[Validators.required,Validators.min(10)]],
    isPlanned: [false],
    isArchived: [false]
  });

  get id() {
    return this.form.controls['id'] as FormControl;
  }
  get libelle() {
    return this.form.controls['libelle'] as FormControl;
  }
  get isPlanned() {
    return this.form.controls['isPlanned'] as FormControl;
  }
  get isArchived() {
    return this.form.controls['isArchived'] as FormControl;
  }
  get nbrePlace() {
    return this.form.controls['nbrePlace'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: SalleServiceImpl,
    private router: Router
  ) {}

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
    } else {
      this.service.update(formData,formData.id).subscribe((data) => {
        if (data.statuts == 201) {
          this.form.reset();
          this.echec=null;
          this.success = 'Modification effectuée avec succès';
          setTimeout(() => {this.success = null;}, 3000);
        } else {
          this.echec = "Erreur de modification";
        }
      });
    }
  }

  setDataForEdit() {
    this.service.findById(Number.parseInt(this.id_data)).subscribe((data) => {
      if (data.statuts == 204) {
        this.router.navigateByUrl('/admin/salle');
      } else {
        this.form.setValue({
          id:data.results.id,
          libelle:data.results.libelle,
          isPlanned:true,
          isArchived:false,
          nbrePlace:data.results.nbrePlace
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
  }
}

  
