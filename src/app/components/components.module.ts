import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

// import { BasicelementsComponent } from './basicelements/basicelements.component';
// import { NavigationComponent } from './navigation/navigation.component';
// import { TypographyComponent } from './typography/typography.component';
// import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
// import { ComponentsComponent } from './components.component';
// import { NotificationComponent } from './notification/notification.component';
// import { NgbdModalComponent } from './modal/modal.component';
// import { NgbdModalContent } from './modal/modal.component';
import { AccueilClientComponent } from './client/accueil-client/accueil-client.component';
import { InscriptionComponent } from './client/inscription/inscription.component';
import { ListePlatsComponent } from './client/liste-plats/liste-plats.component';
import { PanierComponent } from './client/panier/panier.component';
import { ProposComponent } from './client/propos/propos.component';
import { AccueilAdminComponent } from './admin/accueil-admin/accueil-admin.component';
import { UsersComponent } from './admin/users/users.component';
import { StatAdminComponent } from './admin/stat-admin/stat-admin.component';
import { AccueilLivreurComponent } from './livreur/accueil-livreur/accueil-livreur.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [
        // ComponentsComponent,
        // BasicelementsComponent,
        // NavigationComponent,
        // TypographyComponent,
        // NucleoiconsComponent,
        // NotificationComponent,
        // NgbdModalComponent,
        // NgbdModalContent,
        AccueilClientComponent,
        InscriptionComponent,
        ListePlatsComponent,
        PanierComponent,
        ProposComponent,
        AccueilAdminComponent,
        UsersComponent,
        StatAdminComponent,
        AccueilLivreurComponent
    ],
    // entryComponents: [NgbdModalContent],
    // exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
