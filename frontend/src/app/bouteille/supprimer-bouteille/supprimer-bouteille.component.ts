import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiVinoService } from '../../services/api-vino.service';
import { AuthService } from 'src/app/auth/auth-service';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';

export interface DialogData {
  bouteille_id: any;
  cellier_id: any;
  nom: string;
}

@Component({
  selector: 'app-supprimer-bouteille',
  templateUrl: './supprimer-bouteille.component.html',
  styleUrls: ['./supprimer-bouteille.component.scss'],
})
export class SupprimerBouteilleComponent {
  bouteille_id: any;
  cellier_id: any;
  nom: any;

  constructor(
    public dialogRef: MatDialogRef<SupprimerBouteilleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private router: Router,
    private apiVinoService: ApiVinoService
    ,private authService:AuthService, private entete:EnteteAuthComponent
  ) {}

  ngOnInit(): void {
    this.bouteille_id = this.data.bouteille_id;
    this.cellier_id = this.data.cellier_id;
    this.nom = this.data.nom;
  }

  fermerBouteille() {
    this.dialogRef.close();
  }

  supprimerBouteille(bouteiile_id: any, cellier_id: any) {
    this.apiVinoService
      .supprimerBouteille(bouteiile_id, cellier_id)
      .subscribe();
    this.dialogRef.close();
    this.authService.setMessage('Bouteille est supprimer avec succés');
    this.entete.showMessage();
    this.router.navigate(['/cellier', cellier_id, 'bouteille']);
  }
}
