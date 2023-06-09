import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiVinoService} from "../../services/api-vino.service";
import { AuthService } from 'src/app/auth/auth-service';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';

export interface DialogData {
  bouteille_id: any,
  nom: string
}
@Component({
  selector: 'app-supprimer',
  templateUrl: './supprimer.component.html',
  styleUrls: ['./supprimer.component.scss']
})
export class SupprimerComponent {
  bouteille_id: any
  nom: any

  constructor(
    public dialogRef: MatDialogRef<SupprimerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private router: Router,
    private api:ApiVinoService,
    private authService:AuthService,
    private entete:EnteteAuthComponent
  ) {
  }

  ngOnInit(): void {
    this.bouteille_id = this.data.bouteille_id
    
    this.nom = this.data.nom
  }

  fermerBouteille() {
    this.dialogRef.close();
  }

  supprimerBouteille(bouteille_id: number) {
    this.api.supprimerBouteilleListeAchat(bouteille_id)
      .subscribe(
        response => {
          this.fermerBouteille() ;
          console.log('La bouteille a été supprimée de la liste d\'achat');
          // Réalisez les actions nécessaires après la suppression réussie
          this.router.navigate(['/listeAchat'])
          this.authService.setMessage('Bouteille est supprimer avec succés');
          this.entete.showMessage();

        },
        error => {
          console.error('Une erreur s\'est produite lors de la suppression de la bouteille', error);
          // Gérez les erreurs et affichez un message approprié à l'utilisateur
        }
      );
  }
}
