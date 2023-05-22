import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public urlBackend: string = 'http://127.0.0.1:8000/api';
  private estConnecte: boolean = false

  constructor(private http: HttpClient) {
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

    return this.http.get<any>(this.urlBackend + '/utilisateur').pipe(
      catchError(error => {
        // console.log(error)
        return of(false);
      }),
      tap(result => {
        if (result === false) {
          this.estConnecte = false;
        }
      }),
      map(result => {
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
    this.http.post<any>(this.urlBackend + '/logout', {}).subscribe();
    sessionStorage.removeItem('bearer_token')
  }
}
