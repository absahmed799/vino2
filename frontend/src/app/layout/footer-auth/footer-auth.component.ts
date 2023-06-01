import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { ApiVinoService } from 'src/app/services/api-vino.service';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-footer-auth',
  templateUrl: './footer-auth.component.html',
  styleUrls: ['./footer-auth.component.scss'],
})
export class FooterAuthComponent {
  nom: string = '';
  profil: string='';
  estUtilisateurConnecte$: Observable<boolean>;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiVinoService: ApiVinoService
  ) {
   
   this.authService.getNom().subscribe((object)=>{
    
      this.nom = object;
    
   })
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
      .pipe(finalize(() => this.loading = false)) // Hide loading bar
      .subscribe((resultat) => {
        console.log(resultat);
  
        if (resultat) {
          this.authService.setLoading(false) 
          console.log('Importation avec succès!');
        }
      });
  }

  

  // Vérifier si l'utilisateur est connecté
  estUtilisateurConnecte(): boolean {
    return this.authService.estConnecte;
  }
}
