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
  constructor(private location: Location, private authService: AuthService) {}

  // Vérifier si l'utilisateur est connecté
  estUtilisateurConnecte(): Observable<boolean> {
    return this.authService.verifConnection();
  }

  retourner(): void {
    this.location.back();
  }
}
