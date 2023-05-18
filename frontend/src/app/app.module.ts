import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { EnregistrerComponent } from './auth/enregistrer/enregistrer.component';
import { EnteteComponent } from './layout/entete/entete.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuComponent } from './layout/menu/menu.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { ListeCellierComponent } from './cellier/liste-cellier/liste-cellier.component';
import { AjouterCellierComponent } from './cellier/ajouter-cellier/ajouter-cellier.component';
import { ModifierCellierComponent } from './cellier/modifier-cellier/modifier-cellier.component';
import { SupprimerCellierComponent } from './cellier/supprimer-cellier/supprimer-cellier.component';
import { ListeBouteilleComponent } from './bouteille/liste-bouteille/liste-bouteille.component';
import { AjouterBouteilleComponent } from './bouteille/ajouter-bouteille/ajouter-bouteille.component';
import { ModifierBouteilleComponent } from './bouteille/modifier-bouteille/modifier-bouteille.component';
import { SupprimerBouteilleComponent } from './bouteille/supprimer-bouteille/supprimer-bouteille.component';
import { AfficherBouteilleComponent } from './bouteille/afficher-bouteille/afficher-bouteille.component';
import { AccueilComponent } from './layout/accueil/accueil.component';
import { NonTrouverComponent } from './layout/non-trouver/non-trouver.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnregistrerComponent,
    EnteteComponent,
    FooterComponent,
    MenuComponent,
    NavigationComponent,
    ListeCellierComponent,
    AjouterCellierComponent,
    ModifierCellierComponent,
    SupprimerCellierComponent,
    ListeBouteilleComponent,
    AjouterBouteilleComponent,
    ModifierBouteilleComponent,
    SupprimerBouteilleComponent,
    AfficherBouteilleComponent,
    AccueilComponent,
    NonTrouverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
