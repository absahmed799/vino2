import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiVinoService } from 'src/app/services/api-vino.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApi: string;
  estConnecte: boolean = false;
  profil: BehaviorSubject<string>;
  profil$: Observable<string>;

  constructor(
    private http: HttpClient,
    private apiVinoService: ApiVinoService
  ) {
    // URL du API backend dans le service api-vino
    this.urlApi = this.apiVinoService.urlApi;

    // Profil de utilisateur
    this.profil = new BehaviorSubject<string>('');
    this.profil$ = this.profil.asObservable();
  }

  setProfil(profil: any) {
    this.profil.next(profil);
  }

  getProfil(): Observable<any> {
    return this.profil;
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
        return of(false);
      }),
      tap((result) => {
        this.estConnecte = result !== false;
      }),
      map((result) => {
        this.setUserData(result.nom);
        return result !== false;
      })
    );
  }

  removeBearerToken(): void {
    this.http.post<any>(this.urlApi + '/logout', {}).subscribe();
    sessionStorage.removeItem('bearer_token');
  }
}
