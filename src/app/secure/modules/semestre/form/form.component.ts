import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SemestreServiceImpl } from '../../../../core/services/impl/semestre.service.impl';
import { ActivatedRoute, Router } from '@angular/router';
import { RestResponse } from '../../../../core/models/rest.response';
import { Niveau } from '../../../../core/models/niveau';
import { NiveauServiceImpl } from '../../../../core/services/impl/niveau.service.impl';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{
  form = this.fb.group({
    id: new FormControl(),
    libelle: ['', [Validators.required, Validators.minLength(2)]],
    isActive: [false],
    isArchived: [false],
    niveau:new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  get id() {
    return this.form.controls['id'] as FormControl;
  }
  get libelle() {
    return this.form.controls['libelle'] as FormControl;
  }
  get isActive() {
    return this.form.controls['isActive'] as FormControl;
  }
  get isArchived() {
    return this.form.controls['isArchived'] as FormControl;
  }
  get niveau() {
    return this.form.controls['niveau'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;
  niveaux?:RestResponse<Niveau[]>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: SemestreServiceImpl,
    private niveauService: NiveauServiceImpl,
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
          setTimeout(() => {
            this.success = null;
          }, 3000);
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
          setTimeout(() => {
            this.success = null;
          }, 3000);
        } else {
          this.echec = "Erreur de modification";
        }
      });
    }
  }

  setDataForEdit() {
    this.service.findById(Number.parseInt(this.id_data)).subscribe((data) => {
      if (data.statuts == 204) {
        this.router.navigateByUrl('/admin/semestre');
      } else {
        this.form.setValue({
          id:data.results.id,
          libelle:data.results.libelle,
          isActive:data.results.isActive,
          isArchived:false,
          niveau:data.results.niveau.id
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
    //charger niveau
    this.niveauService.findAll().subscribe((data)=>this.niveaux=data);
  }
}
