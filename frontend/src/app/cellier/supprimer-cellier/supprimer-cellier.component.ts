import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { ApiVinoService } from 'src/app/services/api-vino.service';
import { AuthService } from 'src/app/auth/auth-service';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';

export interface DialogData {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-supprimer-cellier',
  templateUrl: './supprimer-cellier.component.html',
  styleUrls: ['./supprimer-cellier.component.scss']
})
export class SupprimerCellierComponent {

  id: any
  nom: any
 

  constructor(
    public dialogRef: MatDialogRef<SupprimerCellierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private router: Router, private api:ApiVinoService,
    private authService:AuthService, private entete:EnteteAuthComponent
  ) {}

  ngOnInit(): void {
    this.id = this.data.id
    this.nom = this.data.nom
  }

  fermerCellier(): void {
    this.dialogRef.close();
  }

  supprimerCellier(id: any) {
    
    this.api.supprimerCellier(id).subscribe();
    this.dialogRef.close();
    this.authService.setMessage('Cellier est supprimer avec success');
    this.entete.showMessage();
    this.router.navigate(['/cellier'])
  }
}
