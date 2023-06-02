import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signaler-erreur',
  templateUrl: './signaler-erreur.component.html',
  styleUrls: ['./signaler-erreur.component.scss']
})
export class SignalerErreurComponent {
  signaler: any = {}; // Object to store form data

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.validateForm()) {
      console.log(this.signaler);
      
      this.http.post('http://127.0.0.1:8000/api/signaler', this.signaler)
        .subscribe(
          response => {
            console.log('Signaler added successfully');
            // Reset form fields
            this.signaler = {};
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
