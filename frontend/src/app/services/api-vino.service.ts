import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiVinoService {
  private url :string = "http://127.0.0.1:8000/api/";
  private panier: any = []; // Variable pour stocker les données du panier

  constructor(private authServ:AuthService, private http:HttpClient) {  }

  // Méthodes pour la gestion du panier
  ajouterAuPanier(article: any): void {
    this.panier.push(article);
  }

  supprimerDuPanier(article: any): void {
    const index = this.panier.indexOf(article);
    if (index > -1) {
      this.panier.splice(index, 1);
    }
  }

  modifierQuantitePanier(article: any, quantite: number): void {
    // Logique pour modifier la quantité d'un article dans le panier
  }

  calculerTotal(): number {
    // Logique pour calculer le total du panier
    return 0;
  }

  getPanierItems(): Observable<any> {
    console.log(this.authServ.getToken());

    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authServ.getToken().toString()}`);
    return this.http.get(this.url+'liste-achat',{ headers })  }
  
  login(utilisateur:any){
    let headers = new HttpHeaders({
        'Content-type': 'application/json',
      })
    
    return this.http.post(this.url+'login',utilisateur, { headers })
  }
  listeCelliers(){
    console.log(this.authServ.getToken());
    
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authServ.getToken().toString()}`);
    return this.http.get(this.url+'celliers',{ headers })
  }
  ajouterCellier(cellier:string){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authServ.getToken().toString()}`);
    return this.http.post(this.url+'user/celliers',cellier,{ headers })
  }
  listebouteilleCellier(cellier_id:any){
    
    return this.http.get(this.url+"celliers/"+cellier_id+"/bouteilles")
  }
  getCellierParid(cellier_id:any){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authServ.getToken().toString()}`);
    return this.http.get(this.url+"celliers/"+cellier_id,{ headers })
  }
  editCellier(cellier_id:any,cellier:any){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authServ.getToken().toString()}`);
    return this.http.put(this.url+"celliers/"+cellier_id,cellier,{ headers })
  }
  supprimerCellier(cellier_id:any){
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.authServ.getToken().toString()}`);
    return this.http.delete(this.url+"celliers/"+cellier_id,{ headers })
  }
  modifierQuantite(quantite:any ,cellier_id:any ,bouteille_id:any){
  console.log(quantite);
  
  return this.http.put(this.url+"celliers/"+cellier_id+"/bouteilles/"+bouteille_id+"/quantite" ,quantite)
  }
}
