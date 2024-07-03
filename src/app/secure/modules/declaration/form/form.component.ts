import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../core/models/authentification';
import { Router } from '@angular/router';
import { DeclarationServiceImpl } from '../../../../core/services/impl/declaration.service.impl';
import { DeclarationCreate } from '../../../../core/models/declaration';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {

  form = this.fb.group({
    motif: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  connectedUser:User=JSON.parse(localStorage.getItem('connectedUser')!);
  seanceId:number=+localStorage.getItem('seanceId')!;

  get motif() {
    return this.form.controls['motif'] as FormControl;
  }

  get description() {
    return this.form.controls['description'] as FormControl;
  }

  echec: String | null = null;
  success: String | null = null;

  constructor (
    private service: DeclarationServiceImpl,
    private fb: FormBuilder,
    private router: Router
  ){}

  onSubmit() {
    const { ...formData} = this.form.value;
    var declaration: DeclarationCreate ={userId:this.connectedUser.userId,seanceId:this.seanceId,motif:formData.motif!,description:formData.description!}
    this.service.create(declaration).subscribe((data) => {
      if (data.statuts == 201) {
        this.form.reset();
        this.echec=null;
        this.success = 'Demande effectuée avec succès';
        setTimeout(() => {
          this.success = null;
          this.router.navigateByUrl('/admin/seance')
        }, 3000);
      } else if (data.statuts == 409) {
        this.echec = "Vous avez déjà fait de demande pur cette session de cours";
      }else {
        this.echec = "Erreur d'enregistrement de la demande";
      }
    });
  }

}
