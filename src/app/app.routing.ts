import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// import { ComponentsComponent } from './components/components.component';
import { AccueilClientComponent } from './components/client/accueil-client/accueil-client.component';
// import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { InscriptionComponent } from './components/client/inscription/inscription.component';
import { ListePlatsComponent } from './components/client/liste-plats/liste-plats.component';
import { PanierComponent } from './components/client/panier/panier.component';
import { ProposComponent } from './components/client/propos/propos.component';
import { AuthGuard } from './auth.guard';
import { AccueilAdminComponent } from './components/admin/accueil-admin/accueil-admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { StatAdminComponent } from './components/admin/stat-admin/stat-admin.component';
import { AccueilLivreurComponent } from './components/livreur/accueil-livreur/accueil-livreur.component';
// import { LandingComponent } from './examples/landing/landing.component';
// import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

const routes: Routes =[
    // { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: '',                      component: SignupComponent },
    { path: 'inscription',           component: InscriptionComponent },
    { path: 'home',                  component: AccueilClientComponent, canActivate:[AuthGuard]},
    { path: 'plats',                 component: ListePlatsComponent,    canActivate:[AuthGuard]},
    { path: 'panier',                component: PanierComponent,        canActivate:[AuthGuard]},
    { path: 'propos',                component: ProposComponent,        canActivate:[AuthGuard]},
    { path: 'commandes',             component: AccueilAdminComponent,  canActivate:[AuthGuard]},
    { path: 'utilisateurs',          component: UsersComponent,         canActivate:[AuthGuard]},
    { path: 'statistiques',          component: StatAdminComponent,     canActivate:[AuthGuard]},
    { path: 'accueil',               component: AccueilLivreurComponent,canActivate:[AuthGuard]}
    // { path: 'user-profile',     component: ProfileComponent },
    // { path: 'landing',          component: LandingComponent },
    // { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
