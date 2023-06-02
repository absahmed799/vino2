import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth-service";
import {ActivatedRoute, Router} from "@angular/router";
import { ApiVinoService } from 'src/app/services/api-vino.service';
import {MatDialog} from "@angular/material/dialog";
import { SupprimerComponent } from '../supprimer/supprimer.component';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';

@Component({
  selector: 'app-liste-achat',
  templateUrl: './liste-achat.component.html',
  styleUrls: ['./liste-achat.component.scss']
})
export class ListeAchatComponent {

  id: any;
  bouteilles: any
  listeAchat: any
  constructor(private http: HttpClient,private entete:EnteteAuthComponent, private authService: AuthService, private router: Router, private route: ActivatedRoute, private api:ApiVinoService, public dialog: MatDialog) {
    this.authService.setLoading(true);
  }

  ngOnInit() {
      this.BouteilleListeAchat();
  }

  BouteilleListeAchat() {
    this.api.getBouteilleListeAchat().subscribe((result: any) => {
      this.bouteilles = result
      
      this.authService.setLoading(false);
      
    });
  }

  modifierQuantiteBouteilleListeAchat(quantite:number, listeAchat: any , bouteille:any) {
    this.api.modifierQuantiteListeAchat({quantite:quantite}, listeAchat,bouteille).subscribe((result: any) => {
      this.BouteilleListeAchat()

    });
  }

  openDialog(bouteille_id: any, cellier_id: any, nom: any) {
    const dialogRef = this.dialog.open(SupprimerComponent, {
      data: {
        bouteille_id: bouteille_id,
        cellier_id: cellier_id,
        nom: nom
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.BouteilleListeAchat()
    });
  }
  viderListeAchat(){
    this.api.deleteAllListeAchat().subscribe((resultat)=>{
      this.router.navigate(['/listeAchat'])
        this.ngOnInit();
          this.authService.setMessage('La liste d\'achat est vidé avec succés');
          this.entete.showMessage();
      console.log('supprimer');
      
    })
  }

}
