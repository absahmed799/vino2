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
import { AjoutBouteilleNonListerComponent } from './bouteille/ajout-bouteille-non-lister/ajout-bouteille-non-lister.component';
import { ListeAchatComponent } from './listeAchat/liste-achat/liste-achat.component';
import { AjoutBouteilleComponent } from './listeAchat/ajout-bouteille/ajout-bouteille.component';
import { SupprimerComponent } from './listeAchat/supprimer/supprimer.component';
import { AdminStatistiqueComponent } from './admin-statistique/admin-statistique.component';


//import { GardienRouteGuard } from './gardien-route.guard';

//import { AuthServService } from './serv/auth-serv.service';

const routes: Routes = [
    //Routes pour cellier
  { path:"cellier", component:ListeCellierComponent,  canActivate: [AuthGuard]},
  { path:"cellier/ajouter", component:AjouterCellierComponent, canActivate: [AuthGuard]},
  { path:"cellier/:id", component:ModifierCellierComponent, canActivate: [AuthGuard]},

  { path:"cellier/:id/bouteille", component: ListeBouteilleComponent, canActivate: [AuthGuard] },
  { path:"cellier/:id/bouteille/ajouter", component: AjouterBouteilleComponent, canActivate: [AuthGuard] },
  { path:"cellier/:id/bouteille/ajouter/nonlister", component: AjoutBouteilleNonListerComponent, canActivate: [AuthGuard] },
  { path:"cellier/:cellier_id/bouteille/:bouteille_id", component: AfficherBouteilleComponent, canActivate: [AuthGuard] },
  { path:"cellier/:cellier_id/bouteille/:bouteille_id/edit", component: ModifierBouteilleComponent, canActivate: [AuthGuard]  },
  { path:"listeAchat", component:ListeAchatComponent, canActivate: [AuthGuard] },
  { path:"statistique", component:AdminStatistiqueComponent, canActivate: [AuthGuard] },
  { path:"listeAchat/ajouter", component:AjoutBouteilleComponent, canActivate: [AuthGuard] },
  { path: "listeAchat/bouteille/:bouteille_id/", component: SupprimerComponent, canActivate: [AuthGuard] },
      //Routes pour Accueil
  { path:"", component:AccueilComponent, canActivate:[GuestGuard]},
  { path:"accueil", component:AccueilComponent, canActivate:[GuestGuard]},

    //Route pour A Propos
  { path:"a-propos", component:AProposComponent},

    // Routes pour Login / Enregistrer
  { path:"login", component: LoginComponent, canActivate:[GuestGuard]},
  { path:"enregistrer", component: EnregistrerComponent, canActivate:[GuestGuard]},

    // Route pour une page non trouvée (Erreur 404)
  { path:"**", component:NonTrouverComponent, canActivate:[GuestGuard]},

];

@NgModule({
  // Utilisation de # dans l'URL
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
