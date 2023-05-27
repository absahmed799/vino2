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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EnteteAuthComponent } from './layout/entete-auth/entete-auth.component';
import { FooterAuthComponent } from './layout/footer-auth/footer-auth.component';
import { AProposComponent } from './layout/a-propos/a-propos.component';

// Importez les modules Angular Material spécifiques dont nous avons besoin:
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import { AuthInterceptor } from './AuthInterceptor';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

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
    NonTrouverComponent,
    EnteteAuthComponent,
    FooterAuthComponent,
    AProposComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,

    // Importez les modules Angular Material ici:
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
