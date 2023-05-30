import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth-service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiVinoService} from "../../services/api-vino.service";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {SupprimerBouteilleComponent} from "../supprimer-bouteille/supprimer-bouteille.component";

@Component({
  selector: 'app-afficher-bouteille',
  templateUrl: './afficher-bouteille.component.html',
  styleUrls: ['./afficher-bouteille.component.scss']
})
export class AfficherBouteilleComponent {
  bouteilleCellier: any
  cellier_id: any
  bouteille_id: any

  constructor(private router: Router, private route: ActivatedRoute, private api:ApiVinoService
    , private location: Location, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.cellier_id = this.route.snapshot.paramMap.get('cellier_id');
    this.bouteille_id = this.route.snapshot.paramMap.get('bouteille_id');

    this.api.afficherBouittelleCellier(this.cellier_id, this.bouteille_id)
      .subscribe(result => {
        this.bouteilleCellier = result
      })
  }

  transformeDate(date: any) {
    if (date){
      const parts = date.split("-");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    }
    return date
  }

  modifierQuantiteBouteille(quantite:number,cellier:any , bouteille:any) {
    this.api.modifierQuantite({quantite:quantite}, cellier,bouteille).subscribe((result: any) => {
      this.ngOnInit()
    });
  }

  retourner(): void {
    this.location.back();
  }

  openDialog(bouteille_id: any, cellier_id: any, nom: any) {
    const dialogRef = this.dialog.open(SupprimerBouteilleComponent, {
      data: {
        bouteille_id: bouteille_id,
        cellier_id: cellier_id,
        nom: nom
      },
    });
  }
}
