import { Component,ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../auth/auth-service';
import { Observable, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-entete-auth',
  templateUrl: './entete-auth.component.html',
  styleUrls: ['./entete-auth.component.scss'],
  providers: [NgbModal]
})
export class EnteteAuthComponent {
  @ViewChild('cartModal') cartModal: any; // Référence au contenu du modal
  panierItems: any[] = [];
  private urlBackend: string = 'http://127.0.0.1:8000/api';

  constructor(private location: Location,private http: HttpClient, private authService: AuthService, public modalService: NgbModal) {}

  // Méthode pour ouvrir le modal
  openCartModal() {
    this.modalService.open(this.cartModal, { ariaLabelledBy: 'modal-title', size: 'lg' });
  }
  
  getPanierItems() {
    
      this.http.get<any>(this.urlBackend + '/liste-achat')
        .pipe(
          //tap(data => this.panierItems = data)
        )
  }















  // Vérifier si l'utilisateur est connecté
  estUtilisateurConnecte(): Observable<boolean> {
    return this.authService.verifConnection();
  }

  retourner(): void {
    this.location.back();
  }
}
