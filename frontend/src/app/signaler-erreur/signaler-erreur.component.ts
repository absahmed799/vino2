import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth-service';
import { EnteteAuthComponent } from '../layout/entete-auth/entete-auth.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signaler-erreur',
  templateUrl: './signaler-erreur.component.html',
  styleUrls: ['./signaler-erreur.component.scss']
})
export class SignalerErreurComponent {
  signaler: any = {}; // Object to store form data

  constructor(private http: HttpClient,private authService:AuthService,private entete:EnteteAuthComponent,private router:Router) { }

  onSubmit() {
    if (this.validateForm()) {
      console.log(this.signaler);
      
      this.http.post('http://127.0.0.1:8000/api/signaler', this.signaler)
        .subscribe(
          response => {
            this.router.navigate(['/cellier']);
            this.authService.setMessage("L'erreur a été signaler avec succés" );
            this.entete.showMessage();
          },
          error => {
            console.log('Error adding signaler:', error);
          }
        );
    } else {
      console.log('Veuillez remplir tous les champs du formulaire');
    }
  }
  
  validateForm(): boolean {
    // Vérifier si les champs sont remplis
    if (this.signaler.titre_erreur && this.signaler.description_erreur) {
      return true;
    } else {
      return false;
    }
  }
}
