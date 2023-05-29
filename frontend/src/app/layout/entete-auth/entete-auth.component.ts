import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../auth/auth-service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-entete-auth',
  templateUrl: './entete-auth.component.html',
  styleUrls: ['./entete-auth.component.scss'],
})
export class EnteteAuthComponent {
  estUtilisateurConnecte$: Observable<boolean>;

  constructor(private location: Location, private authService: AuthService) {
    this.estUtilisateurConnecte$ = this.authService.verifConnection();
  }

  // Vérifier si l'utilisateur est connecté
  estUtilisateurConnecte(): boolean {
    return this.authService.estConnecte;
  }
  
  

  retourner(): void {
    this.location.back();
  }
}
