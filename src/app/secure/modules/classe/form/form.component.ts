import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { NiveauServiceImpl } from '../../../../core/services/impl/niveau.service.impl';
import { FiliereServiceImpl } from '../../../../core/services/impl/filiere.service.impl';
import { RestResponse } from '../../../../core/models/rest.response';
import { Niveau } from '../../../../core/models/niveau';
import { Filiere } from '../../../../core/models/filiere';

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
    libelle: ['', [Validators.required, Validators.minLength(3)]],
    effectif: [0,[Validators.required,Validators.min(0)]],
    niveau:[0,[Validators.required, Validators.min(1)]],
    filiere:[0,[Validators.required, Validators.min(1)]],
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
  get effectif() {
    return this.form.controls['effectif'] as FormControl;
  }
  get niveau() {
    return this.form.controls['niveau'] as FormControl;
  }
  get filiere() {
    return this.form.controls['filiere'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: string  = "";
  echec: String | null = null;
  success: String | null = null;
  niveaux?:RestResponse<Niveau[]> ;
  filieres?:RestResponse<Filiere[]> ;
  niveauSelected: String="";
  filiereSelected: String="";

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ClasseServiceImpl,
    private niveauService: NiveauServiceImpl,
    private filiereService: FiliereServiceImpl,
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
        this.router.navigateByUrl('/admin/classe');
      } else {
        this.form.setValue({
          id:data.results.id,
          libelle:data.results.libelle,
          isPlanned:true,
          isArchived:false,
          effectif:data.results.effectif,
          niveau:data.results.niveau.id,
          filiere:data.results.filiere.id
        })
      }
    });
  }

  filiereChosen(fil: number) {
    this.filiereService.findById(fil).subscribe((data)=>this.filiereSelected=data.results.libelle);
    setTimeout(() => {this.libelle.setValue(this.niveauSelected +" "+ this.filiereSelected);}, 100)
  }
  niveauChosen(niv: number) {
    this.niveauService.findById(niv).subscribe((data)=>this.niveauSelected=data.results.libelle);
    setTimeout(() => {this.libelle.setValue(this.niveauSelected +" "+ this.filiereSelected);}, 100)
  }

  ngOnInit(): void {
    this.id_data = this.route.snapshot.paramMap.get('id')!.toString();
    this.isEdit = this.id_data == 'new' ? false : true; //Recuperer le param id de la route active
    if (this.isEdit) {
      this.setDataForEdit();
    }

    this.niveauService.findAll().subscribe((data)=>this.niveaux=data);
    this.filiereService.findAll().subscribe((data)=>this.filieres=data);
  }
}

  
