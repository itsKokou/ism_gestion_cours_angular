import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './secure/pages/page-not-found/page-not-found.component';
import { AuthentificateService } from './core/services/auth/authentificate.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    {
        path:"admin",
        loadChildren: ()=> import("./secure/secure.module").then(mod=>mod.SecureModule),
        canMatch:[()=>inject(AuthentificateService).isAuthentificated]
    },
    {
        path:"login",
        loadChildren: ()=> import("./public/public.module").then(mod=>mod.PublicModule)
    },
    {
        path:"logout",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];
