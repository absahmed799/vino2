import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.component.html',
  styleUrls: ['./enregistrer.component.scss']
})
export class EnregistrerComponent {
  private urlBackend: string = 'http://127.0.0.1:8000/api';
  error = false;
  message_error = '';

  passwordsDoNotMatch: boolean = false;
  checkPasswordsMatch(c: AbstractControl): ValidationErrors | null {
    const mot_de_passe = c.get('mot_de_passe');
    const confirm_password = c.get('confirm_password');
    if (mot_de_passe && confirm_password && mot_de_passe.value !== confirm_password.value) {
      return { passwordsDoNotMatch: true };
    }
    return null;
  }
  enregistrer = new FormGroup({
      nom: new FormControl('', Validators.required),
      courriel: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      mot_de_passe: new FormControl('', [
        Validators.required,
      ]),
    confirm_password: new FormControl('', Validators.required),
    role_id: new FormControl(2)
  }, { validators: this.checkPasswordsMatch })

  constructor(private http: HttpClient, private router: Router) {
  }

  enregistrerSubmit() {
    if (this.enregistrer.valid) {
      let httpOption = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        })
      };
      let response = this.http.post<any>(this.urlBackend + '/utilisateurs', this.enregistrer.value, httpOption).pipe(
        catchError(error => {
          let handledError = this.handleError(error);
          // Traiter l'erreur ici
          this.error = true;
          this.message_error = handledError;
          return EMPTY;
        })
      ).subscribe((result: any) => {
        this.error = false;
        this.router.navigate(['/login'])
      });

    }
    else {

      if (this.enregistrer.hasError('passwordsDoNotMatch')){
        this.passwordsDoNotMatch = true;
      }
      this.enregistrer.markAllAsTouched();
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      let errorBackend = error.error.message;
      console.log(errorBackend)
      return errorBackend;
    }
  }
}
