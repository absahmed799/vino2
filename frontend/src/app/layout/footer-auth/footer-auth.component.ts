import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { ApiVinoService } from 'src/app/services/api-vino.service';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Chart, BarController,BarElement, CategoryScale, LinearScale } from 'chart.js';
import { EnteteAuthComponent } from '../entete-auth/entete-auth.component';
Chart.register(BarController,BarElement, CategoryScale, LinearScale);
@Component({
  selector: 'app-footer-auth',
  templateUrl: './footer-auth.component.html',
  styleUrls: ['./footer-auth.component.scss'],
})
export class FooterAuthComponent {
  nom: string|null = '';
  profil: string='';
  estUtilisateurConnecte$: Observable<boolean>;
  loading: boolean = false;

  role: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiVinoService: ApiVinoService,
    private entete:EnteteAuthComponent
  ) {

    this.authService.getRole().subscribe((role)=>{
      this.role = role
    });

    this.authService.getNom().subscribe((nom)=>{
      this.nom = nom
    });

   this.authService.getProfil().subscribe((object)=>{

    this.profil = object;

 })
    this.estUtilisateurConnecte$ = this.authService.verifConnection();

 }

  ngOnInit() {
  }

  deconnexion() {
    this.authService.removeBearerToken();
    this.router.navigate(['/login']);
  }

  importationSaq() {
    this.authService.setLoading(true)
    this.apiVinoService.importationSaq()
      .pipe(finalize(() => this.authService.setLoading(false) )) // Hide loading bar
      .subscribe((resultat) => {
        console.log(resultat);

        if (resultat) {
          this.authService.setLoading(false);
          this.authService.setMessage('Importation avec succès!');
          this.entete.showMessage();
          console.log('Importation avec succès!');
        }
      });
  }



  // Vérifier si l'utilisateur est connecté
  estUtilisateurConnecte(): boolean {
    return this.authService.estConnecte;
  }
}
