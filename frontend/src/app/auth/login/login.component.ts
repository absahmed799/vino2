import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, flatMap, map, retry, tap } from 'rxjs/operators';
import { EMPTY, of, throwError } from 'rxjs';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { ApiVinoService } from 'src/app/services/api-vino.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
@Injectable()
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  error = false;
  message_error = '';
  erreurMessage: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private apiVinoService: ApiVinoService
  ) {}

  submitLogin() {
    console.log(this.loginForm.value);

    this.apiVinoService
      .login(this.loginForm.value)
      .pipe(
        catchError((error) => {
          this.error = true;
          this.erreurMessage = 'Courriel ou mot de passe invalide.';
          return throwError(error);
        })
      )
      .subscribe((result: any) => {
        this.error = false;
        this.authService.setBearerToken(result.access_token);
        this.authService.setUserData(result.utilisateur.nom);
        this.router.navigate(['/cellier']);

        this.apiVinoService.profile().subscribe((profil) => {
          this.authService.setProfil(profil.role_id);
        });
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      let errorBackend = error.error.message;
      console.log(errorBackend);
      return errorBackend;
    }
  }
}
