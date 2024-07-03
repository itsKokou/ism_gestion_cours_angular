import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    //Tout composant à charger au demarrage
    LayoutComponent,
    SidebarComponent,
    TopbarComponent,
    
  ],
  imports: [CommonModule, SecureRoutingModule,RouterLink],
  exports: [
  
    //Les composants accessibles à l'extérieur du module
  ],
})
export class SecureModule {}
