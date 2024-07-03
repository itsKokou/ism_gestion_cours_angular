import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ReinscriptionFormComponent } from './modules/inscription/reinscription-form/reinscription-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: ()=> import("./modules/dashboard/dashboard.module").then(mod=>mod.DashboardModule),
      },
      {
        path: 'absence',
        loadChildren: ()=> import("./modules/absence/absence.module").then(mod=>mod.AbsenceModule),
      },
      {
        path: 'annee/scolaire',
        loadChildren: ()=> import("./modules/annee-scolaire/annee-scolaire.module").then(mod=>mod.AnneeScolaireModule),
      },
      {
        path: 'classe',
        loadChildren: ()=> import("./modules/classe/classe.module").then(mod=>mod.ClasseModule),
      },
      {
        path: 'cours',
        loadChildren: ()=> import("./modules/cours/cours.module").then(mod=>mod.CoursModule),
      },
      {
        path: 'declaration',
        loadChildren: ()=> import("./modules/declaration/declaration.module").then(mod=>mod.DeclarationModule),
      },
      {
        path: 'etudiant',
        loadChildren: ()=> import("./modules/etudiant/etudiant.module").then(mod=>mod.EtudiantModule),
      },
      {
        path: 'inscription',
        loadChildren: ()=> import("./modules/inscription/inscription.module").then(mod=>mod.InscriptionModule),
      },
      {
        path: 'reinscription',
        component: ReinscriptionFormComponent
      },
      {
        path: 'module',
        loadChildren: ()=> import("./modules/module/module.module").then(mod=>mod.ModuleModule),
      },
      {
        path: 'professeur',
        loadChildren: ()=> import("./modules/professeur/professeur.module").then(mod=>mod.ProfesseurModule),
      },
      {
        path: 'salle',
        loadChildren: ()=> import("./modules/salle/salle.module").then(mod=>mod.SalleModule),
      },
      {
        path: 'seance',
        loadChildren: ()=> import("./modules/seance/seance.module").then(mod=>mod.SeanceModule),
      },
      {
        path: 'semestre',
        loadChildren: ()=> import("./modules/semestre/semestre.module").then(mod=>mod.SemestreModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
