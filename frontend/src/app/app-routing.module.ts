import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './layout/accueil/accueil.component';
import { AProposComponent } from './layout/a-propos/a-propos.component';
import { ListeCellierComponent } from './cellier/liste-cellier/liste-cellier.component';
import { AjouterCellierComponent } from './cellier/ajouter-cellier/ajouter-cellier.component';
import { ModifierCellierComponent } from './cellier/modifier-cellier/modifier-cellier.component';
import { LoginComponent } from './auth/login/login.component';
import { EnregistrerComponent } from './auth/enregistrer/enregistrer.component';
import { NonTrouverComponent } from './layout/non-trouver/non-trouver.component';
import { ListeBouteilleComponent } from './bouteille/liste-bouteille/liste-bouteille.component';
import { AfficherBouteilleComponent } from './bouteille/afficher-bouteille/afficher-bouteille.component';
import { ModifierBouteilleComponent } from './bouteille/modifier-bouteille/modifier-bouteille.component';
import {AuthGuard} from "./auth/AuthGuard";
import {GuestGuard} from "./auth/GuestGuard";
import {AjouterBouteilleComponent} from "./bouteille/ajouter-bouteille/ajouter-bouteille.component";


//import { GardienRouteGuard } from './gardien-route.guard';

//import { AuthServService } from './serv/auth-serv.service';

const routes: Routes = [
    //Routes pour cellier
  { path:"cellier", component:ListeCellierComponent,  canActivate: [AuthGuard]},
  { path:"cellier/ajouter", component:AjouterCellierComponent, canActivate: [AuthGuard]},
  { path:"cellier/:id", component:ModifierCellierComponent, canActivate: [AuthGuard]},

  { path:"cellier/:id/bouteille", component: ListeBouteilleComponent, canActivate: [AuthGuard] },
  { path:"cellier/:id/bouteille/ajouter", component: AjouterBouteilleComponent, canActivate: [AuthGuard] },
  { path:"cellier/:id/bouteille/:id", component: AfficherBouteilleComponent, canActivate: [AuthGuard] },
  { path:"cellier/:id/bouteille/:id/edit", component: ModifierBouteilleComponent, canActivate: [AuthGuard]  },

    //Routes pour Accueil
  { path:"", component:AccueilComponent, canActivate:[GuestGuard]},
  { path:"accueil", component:AccueilComponent, canActivate:[GuestGuard]},

    //Route pour A Propos
    { path:"a-propos", component:AProposComponent, canActivate:[AuthGuard]},

    // Routes pour Login / Enregistrer
  { path:"login", component: LoginComponent, canActivate:[GuestGuard]},
  { path:"enregistrer", component: EnregistrerComponent, canActivate:[GuestGuard]},

    // Route pour une page non trouvée (Erreur 404)
  { path:"**", component:NonTrouverComponent, canActivate:[GuestGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
