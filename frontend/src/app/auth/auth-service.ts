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
  id_cellier: BehaviorSubject<string>;
  id_cellier$: Observable<string>;
  loading: BehaviorSubject<boolean>;
  loading$: Observable<boolean>;
  message: BehaviorSubject<string>;
  message$: Observable<string>;
  nom: BehaviorSubject<string>;
  nom$: Observable<string>;

  constructor(
    private http: HttpClient,
    private apiVinoService: ApiVinoService
  ) {
    // URL du API backend dans le service api-vino
    this.urlApi = this.apiVinoService.urlApi;

    // Profil de utilisateur
    this.profil = new BehaviorSubject<string>('');
    this.profil$ = this.profil.asObservable();
    this.id_cellier = new BehaviorSubject<string>('');
    this.id_cellier$ = this.profil.asObservable();
    this.loading= new BehaviorSubject<boolean>(false);
    this.loading$=this.loading.asObservable();
    this.message = new BehaviorSubject<string>('');
    this.message$ = this.profil.asObservable();
    this.nom = new BehaviorSubject<string>('');
    this.nom$ = this.profil.asObservable();
  }
  

  setId_cellier(id_cellier: any) {
    this.id_cellier.next(id_cellier);
  }

  getId_cellier(): Observable<any> {
    return this.id_cellier;
  }
  setProfil(profil: any) {
    this.profil.next(profil);
  }
  setLoading( status:boolean){
    this.loading.next(status);
  }

  getLoading():Observable<boolean>{
    return this.loading;
  }
  getProfil(): Observable<any> {
    return this.profil;
  }
 setMessage(message: any) {
    this.message.next(message);
  }
  getMessage(): Observable<any> {
    return this.message;
  }
  setNom(nom: any) {
    this.nom.next(nom);
  }
  getNom(): Observable<any> {
    return this.nom;
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
