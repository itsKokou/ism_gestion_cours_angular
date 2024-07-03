import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { ModuleList } from '../../../../core/models/module';
import { RestResponse } from '../../../../core/models/rest.response';
import { ModuleServiceImpl } from '../../../../core/services/impl/module.service.impl';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [PaginationComponent,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit{

  dataPagination: PaginationModel = {pages:[], currentPage:0, totalPages:0, hasPrev:false, hasNext:false}
  response?: RestResponse<ModuleList[]>;

  form = this.fb.group({
    id: new FormControl(),
    libelle: ['', [Validators.required, Validators.minLength(3)]],
    isArchived: [false]
  });

  get id() {
    return this.form.controls['id'] as FormControl;
  }
  get libelle() {
    return this.form.controls['libelle'] as FormControl;
  }
  get isArchived() {
    return this.form.controls['isArchived'] as FormControl;
  }

  isEdit: Boolean = false;
  id_data: number|null=null;
  echec: String | null = null;
  success: String | null = null;

  constructor(
    private moduleService: ModuleServiceImpl,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  paginate(page: number) {
    this.refresh(page)
  }

  refresh(page:number=0){
    this.moduleService.findAll(page).subscribe((data) => {
      this.response = data
      this.dataPagination.currentPage = data.currentPage!
      this.dataPagination.hasNext = data.hasNext!
      this.dataPagination.hasPrev = data.hasPrev!
      this.dataPagination.pages = data.pages! 
      this.dataPagination.totalPages = data.totalPages!
    }); 
  }

  onSubmit() {
    const { ...formData} = this.form.value;
    formData.libelle = formData.libelle?.toUpperCase();
    if (!this.isEdit) {
      this.moduleService.create(formData).subscribe((data) => {
        if (data.statuts == 201) {
          this.form.reset();
          this.echec=null;
          this.success = 'Enregistrement effectué avec succès';
          setTimeout(() => {this.success = null;}, 3000);
          this.refresh();
        } else {
          this.echec = "Erreur d'enregistrement";
        }
      });
    } else {
      this.moduleService.update(formData,formData.id).subscribe((data) => {
        if (data.statuts == 201) {
          this.form.reset();
          this.echec=null;
          this.success = 'Modification effectuée avec succès';
          setTimeout(() => {this.success = null; }, 3000);
          this.isEdit = false;
          this.id_data = null;
          this.refresh();
        } else {
          this.echec = "Erreur de modification";
        }
      });
    }
  }

  setDataForEdit() {
    this.moduleService.findById(this.id_data!).subscribe((data) => {
      if (data.statuts == 204) {
        this.router.navigateByUrl('/admin/modules');
      } else {
        this.form.setValue({
          id:data.results.id,
          libelle:data.results.libelle,
          isArchived:false
        })
      }
    });
  }

  editModule(id: number) {
    this.id_data=id;
    this.isEdit=true;
    this.setDataForEdit();
  }

  ngOnInit(): void {
    this.refresh();  
  }

}
