import { Component, OnInit } from '@angular/core';
import { AnneeScolaireServiceImpl } from '../../../core/services/impl/annee-scolaire.service.impl';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthentificateService } from '../../../core/services/auth/authentificate.service';
import { Router } from '@angular/router';
import { RestResponse } from '../../../core/models/rest.response';
import { TokenResponse } from '../../../core/models/authentification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  error!:string|null;
  
  
  constructor(
    private anneeService : AnneeScolaireServiceImpl,
    private fb: FormBuilder,
    private authService: AuthentificateService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: '',
      password: '',
    });
  }

  onSubmit() {
    let data = this.form.getRawValue();
    this.authService.login(data).subscribe((res: RestResponse<TokenResponse>) => {
      
      if (res.statuts==200) {
        //Aller recuperer le user
        this.error=null;
        this.authService.isAuthentificated=true;
        this.authService.username=res.results.username
        this.authService.roles=res.results.roles
        var {token,...user} = res.results;
        localStorage.setItem("token",res.results.token)
        localStorage.setItem("connectedUser",JSON.stringify(user));
        user.roles.includes("ROLE_PROFESSEUR") ? localStorage.setItem("professeurSeance",user.userId.toString()) : localStorage.setItem("professeurSeance",'0');
        this.router.navigateByUrl('/admin/home');
      } else {
        this.authService.isAuthentificated=false;
        this.error="Login ou mot de passe incorrect";
        console.log("Error");
      }
    });
  }
  
  ngOnInit(): void {
    
    this.anneeService.findAllList().subscribe((data)=>{
      var annees =  data.results;
      localStorage.setItem("annees",JSON.stringify(annees));
      for (let index = 0; index < data.results.length; index++) {
        if (data.results[index].isActive==true) {
          localStorage.setItem("anneeEncours",JSON.stringify(data.results[index]));
          break;
        }
        
      }
    });

    localStorage.setItem("classeSeance",'0');
    
    localStorage.setItem("couleurSeance",'0');
    //Planifier mode est à 0 par defaut
    localStorage.setItem('mode','NORMAL');
  }

}
