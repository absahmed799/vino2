import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiVinoService {
  private url :string = "http://127.0.0.1:8000/api/";
  constructor( private http:HttpClient) {
    
   
   }
  login(utilisateur:any){
    let headers = new HttpHeaders({
        'Content-type': 'application/json',
      })
    
    return this.http.post(this.url+'login',utilisateur, )
  }
  listeCelliers(){
   
    
    
    return this.http.get(this.url+'celliers',)
  }
  ajouterCellier(cellier:string){
    
    return this.http.post(this.url+'user/celliers',cellier,)
  }
  listebouteilleCellier(cellier_id:any){
    
    return this.http.get(this.url+"celliers/"+cellier_id+"/bouteilles")
  }
  getCellierParid(cellier_id:any){
    
    return this.http.get(this.url+"celliers/"+cellier_id,)
  }
  editCellier(cellier_id:any,cellier:any){
    
    return this.http.put(this.url+"celliers/"+cellier_id,cellier,)
  }
  supprimerCellier(cellier_id:any){
    
    return this.http.delete(this.url+"celliers/"+cellier_id,)
  }
  modifierQuantite(quantite:any ,cellier_id:any ,bouteille_id:any){
  console.log(quantite);
  
  return this.http.put(this.url+"celliers/"+cellier_id+"/bouteilles/"+bouteille_id+"/quantite" ,quantite)
  }
  getBouteilles() {
    return this.http.get<any>(this.url+'bouteilles')    
  }
  logout(){
     return this.http.delete(this.url+"logout")
  }
  profile(){
    return this.http.get<any>(this.url + 'utilisateur')
  }
}
