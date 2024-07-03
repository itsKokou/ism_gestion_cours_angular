import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClasseServiceImpl } from '../../../../core/services/impl/classe.service.impl';
import { ClasseList } from '../../../../core/models/classe';
import { DashboardServiceImpl } from '../../../../core/services/impl/dashboard.service.impl';
import { ProfHome, RPHome } from '../../../../core/models/home';
import { TokenResponse, User } from '../../../../core/models/authentification';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  constructor(private dashboardService: DashboardServiceImpl){}

  profHome?:ProfHome;
  rpHome?:RPHome;

  connectedUser:User = JSON.parse(localStorage.getItem("connectedUser")!);

  ngOnInit(): void {
    if (this.connectedUser.roles.includes('ROLE_PROFESSEUR')) {
      this.dashboardService.findProfData(this.connectedUser.userId).subscribe((data)=>this.profHome=data.results);
    }else{
      this.dashboardService.findRPData(this.connectedUser.userId).subscribe((data)=>this.rpHome=data.results);
    }
  }
}
