import { CommonModule } from '@angular/common';
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/models/authentification';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  connectedUser:User=JSON.parse(localStorage.getItem("connectedUser")!);

  constructor(private router: Router) {}

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  activeParameter(): boolean {
    var url = this.router.url;
    if (
      url.startsWith("/admin/annee/scolaire") || url.startsWith("/admin/etudiant") || 
      url.startsWith("/admin/professeur") || url.startsWith("/admin/module") || 
      url.startsWith("/admin/classe") || url.startsWith("/admin/semestre") || url.startsWith("/admin/salle") 
    ) {
      return true;
    }
    return false;
  }

  isPagesMenuOpen: boolean = false;
  togglePagesMenu() {
    this.isPagesMenuOpen = !this.isPagesMenuOpen;
  }
}
