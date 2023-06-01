import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { ApiVinoService } from 'src/app/services/api-vino.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-footer-auth',
  templateUrl: './footer-auth.component.html',
  styleUrls: ['./footer-auth.component.scss'],
})
export class FooterAuthComponent {
  nom: string = '';
  profil: any;
  estUtilisateurConnecte$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiVinoService: ApiVinoService
  ) {
    this.authService.getProfil().subscribe((profil) => {
      this.profil = profil;
      console.log(this.profil);
    });

    this.estUtilisateurConnecte$ = this.authService.verifConnection();
  }

  ngOnInit() {
    this.nom = this.nom = this.authService.getUserData() ?? '';
  }

  deconnexion() {
    this.authService.removeBearerToken();
    this.router.navigate(['/login']);
  }

  importationSaq() {
    this.apiVinoService.importationSaq().subscribe((resultat) => {
      console.log(resultat);

      if (resultat) {
        console.log('Importation avec success!');
      }
    });
  }

  verificationProfil() {
    let profil = this.apiVinoService.profile().subscribe((profil) => {
      if (profil.role_id == '1') {
        return true;
      } else {
        return false;
      }
    });
  }

  // Vérifier si l'utilisateur est connecté
  estUtilisateurConnecte(): boolean {
    return this.authService.estConnecte;
  }
}
