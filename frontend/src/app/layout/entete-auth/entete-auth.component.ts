import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../auth/auth-service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-entete-auth',
  templateUrl: './entete-auth.component.html',
  styleUrls: ['./entete-auth.component.scss'],
})
export class EnteteAuthComponent {
  estUtilisateurConnecte$: Observable<boolean>;
  loading:boolean=false;
  message: any = '';
  

  constructor(private location: Location, private authService: AuthService) {
    this.estUtilisateurConnecte$ = this.authService.verifConnection();
    this.authService.getLoading().subscribe((loading)=>{
      this.loading=loading;

    })
    this.authService.getMessage().subscribe((message)=>{
      this.message=message 
       setTimeout(() => {
      
      this.message = ''; // Clear the message after 3 seconds
    }, 3000); // 3000 milliseconds = 3 seconds
    });
  
  }

  // Vérifier si l'utilisateur est connecté
  estUtilisateurConnecte(): boolean {
    return this.authService.estConnecte;
  }
  
  showMessage() {
    
    
   
    
    setTimeout(() => {
      
      this.message = ''; // Clear the message after 3 seconds
    }, 5000); // 3000 milliseconds = 3 seconds
  }

  retourner(): void {
    this.location.back();
  }
  
 
}
