import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './layout/accueil/accueil.component';
import { ListeCellierComponent } from './cellier/liste-cellier/liste-cellier.component';
import { AjouterCellierComponent } from './cellier/ajouter-cellier/ajouter-cellier.component';
import { ModifierCellierComponent } from './cellier/modifier-cellier/modifier-cellier.component';
import { LoginComponent } from './auth/login/login.component';
import { EnregistrerComponent } from './auth/enregistrer/enregistrer.component';
import { NonTrouverComponent } from './layout/non-trouver/non-trouver.component';
import { ListeBouteilleComponent } from './bouteille/liste-bouteille/liste-bouteille.component';
import { AfficherBouteilleComponent } from './bouteille/afficher-bouteille/afficher-bouteille.component';
import { ModifierBouteilleComponent } from './bouteille/modifier-bouteille/modifier-bouteille.component';


//import { GardienRouteGuard } from './gardien-route.guard';

//import { AuthServService } from './serv/auth-serv.service';

const routes: Routes = [
  { path:"", component:AccueilComponent,/* canActivate:[GardienRouteGuard]*/},
 
  { path:"cellier", component:ListeCellierComponent, /* canActivate:[GardienRouteGuard]*/},
  { path:"cellier/ajouter", component:AjouterCellierComponent, /* canActivate:[GardienRouteGuard]*/},
  { path:"cellier/:id", component:ModifierCellierComponent, /* canActivate:[GardienRouteGuard]*/},
 
  { path:"cellier/:id/bouteille", component: ListeBouteilleComponent },
  { path:"cellier/:id/bouteille/ajouter", component: LoginComponent },
  { path:"cellier/:id/bouteille/:id", component: AfficherBouteilleComponent },
  { path:"cellier/:id/bouteille/:id/edit", component: ModifierBouteilleComponent  },
  { path:"login", component: LoginComponent },
  { path:"login", component: LoginComponent },
  { path:"register", component: EnregistrerComponent },
  { path:"**", component:NonTrouverComponent, /* canActivate:[GardienRouteGuard]*/},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
