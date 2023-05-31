import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ApiVinoService {
  public urlApi: string = 'http://127.0.0.1:8000/api'; // URL du API backend
  constructor(private http: HttpClient) {}

  login(utilisateur: any) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
    });

    return this.http.post(this.urlApi + '/login', utilisateur);
  }

  listeCelliers() {
    return this.http.get(this.urlApi + '/celliers');
  }

  ajouterCellier(cellier: string) {
    return this.http.post(this.urlApi + '/user/celliers', cellier);
  }

  listebouteilleCellier(cellier_id: any) {
    return this.http.get(
      this.urlApi + '/celliers/' + cellier_id + '/bouteilles'
    );
  }

  getCellierParid(cellier_id: any) {
    return this.http.get(this.urlApi + '/celliers/' + cellier_id);
  }

  editCellier(cellier_id: any, cellier: any) {
    return this.http.put(this.urlApi + '/celliers/' + cellier_id, cellier);
  }

  supprimerCellier(cellier_id: any) {
    return this.http.delete(this.urlApi + '/celliers/' + cellier_id);
  }

  modifierQuantite(quantite: any, cellier_id: any, bouteille_id: any) {
    console.log(quantite);

    return this.http.put(
      this.urlApi +
        '/celliers/' +
        cellier_id +
        '/bouteilles/' +
        bouteille_id +
        '/quantite',
      quantite
    );
  }

  getBouteilles() {
    return this.http.get<any>(this.urlApi + '/bouteilles');
  }

  logout() {
    return this.http.delete(this.urlApi + '/logout');
  }

  profile() {
    return this.http.get<any>(this.urlApi + '/utilisateur');
  }

  importationSaq() {
    return this.http.get<any>(this.urlApi + '/import-products');
  }
  ajouterBouteille(cellier_id: number, body: object) {
    return this.http.post(this.urlApi + '/celliers/'+ cellier_id +'/bouteilles', body);
  }

  supprimerBouteille(bouteiile_id: number, cellier_id: number) {
    return this.http.delete(this.urlApi + '/celliers/' + cellier_id + '/bouteilles/' + bouteiile_id);
  }

  afficherBouittelleCellier(cellier_id:any ,bouteille_id:any){
    return this.http.get(this.urlApi+"/celliers/"+cellier_id+"/bouteilles/"+bouteille_id)
  }

  modifierBouteilleCellier(cellier_id: any, bouteille_id: any, body: object) {
    return this.http.put(this.urlApi + '/celliers/'+ cellier_id +'/bouteilles/'+bouteille_id, body);
  }
  ajouterBouittelleNonLister(cellier_id: any, body:object){
    return this.http.put(this.urlApi + '/celliers/'+ cellier_id +'/bouteille', body);
  
  }

  getPaysList() {
    return this.http.get(`${this.urlApi}/pays`);
  }
}
