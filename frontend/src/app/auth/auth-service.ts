import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiVinoService } from 'src/app/services/api-vino.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApi: string;
  private estConnecte: boolean = false;

  constructor(
    private http: HttpClient,
    private apiVinoService: ApiVinoService
  ) {
    // URL du API backend dans le service api-vino
    this.urlApi = this.apiVinoService.urlApi;
  }

  setBearerToken(token: string) {
    sessionStorage.setItem('bearer_token', token);
  }

  setUserData(nom: string) {
    sessionStorage.setItem('nom', nom);
  }

  getUserData() {
    return sessionStorage.getItem('nom');
  }

  getBearerToken() {
    return sessionStorage.getItem('bearer_token');
  }

  verifConnection(): Observable<boolean> {
    return this.http.get<any>(this.urlApi + '/utilisateur').pipe(
      catchError((error) => {
        // console.log(error)
        return of(false);
      }),
      tap((result) => {
        if (result === false) {
          this.estConnecte = false;
        }
      }),
      map((result) => {
        this.setUserData(result.nom);
        if (result !== false) {
          this.estConnecte = true;
          return this.estConnecte;
        } else {
          return result;
        }
      })
    );
  }

  removeBearerToken(): void {
    this.http.post<any>(this.urlApi + '/logout', {}).subscribe();
    sessionStorage.removeItem('bearer_token');
  }
}
