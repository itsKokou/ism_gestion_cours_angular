import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnneeScolaireServiceImpl } from '../../../../core/services/impl/annee-scolaire.service.impl';
import { AnneeScolaireCreate, AnneeScolaireList } from '../../../../core/models/annee.scolaire';
import { RestResponse } from '../../../../core/models/rest.response';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  form = this.fb.group({
    id: new FormControl(),
    libelle: ['', [Validators.required, Validators.minLength(5)]],
    isActive: [false],
    isArchived: [false],
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

  isEdit: Boolean = false;
  idAnnee: string  = "";
  datesDebut: String[] = [];
  echec: String | null = null;
  success: String | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private anneeScolaireService: AnneeScolaireServiceImpl,
    private router: Router
  ) {}

  createLibelle(event: Event) {
    const anneeSelect = event.target as HTMLSelectElement;
    this.libelle.setValue(anneeSelect.value + '-' + (+anneeSelect.value + 1));
  }

  onSubmit() {
    const { ...anneeScolaire } = this.form.value;
    if (!this.isEdit) {
      this.anneeScolaireService.create(anneeScolaire).subscribe((data) => {
        if (data.statuts == 201) {
          this.form.reset();
          this.echec=null;
          this.success = 'Enregistrement effectué avec succès';
          setTimeout(() => {
            this.success = null;
          }, 3000);
        } else {
          this.echec = "Erreur d'enregistrement de l'année scolaire";
        }
      });
    } else {
      this.anneeScolaireService.update(anneeScolaire,anneeScolaire.id).subscribe((data) => {
        if (data.statuts == 201) {
          this.form.reset();
          this.echec=null;
          this.success = 'Modification effectuée avec succès';
          setTimeout(() => {
            this.success = null;
          }, 3000);
        } else {
          this.echec = "Erreur de modification de l'année scolaire";
        }
      });
    }
  }

  setDataForEdit() {
    this.anneeScolaireService.findById(Number.parseInt(this.idAnnee)).subscribe((data) => {
      if (data.statuts == 204) {
        this.router.navigateByUrl('/admin/annee/scolaire');
      } else {
        this.form.setValue({id:data.results.id,libelle:data.results.libelle,isActive:data.results.isActive,isArchived:false})
      }
    });
  }

  ngOnInit(): void {
    this.idAnnee = this.route.snapshot.paramMap.get('id')!.toString();
    this.isEdit = this.idAnnee == 'new' ? false : true; //Recuperer le param id de la route active
    if (this.isEdit) {
      this.setDataForEdit();
    }
    let currentYear = new Date().getFullYear();
    for (let index = 0; index < 5; index++) {
      this.datesDebut.push((currentYear + index).toString());
    }
  }
}
