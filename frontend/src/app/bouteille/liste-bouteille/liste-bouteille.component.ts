import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiVinoService } from 'src/app/services/api-vino.service';
import { MatDialog } from '@angular/material/dialog';
import { SupprimerBouteilleComponent } from '../supprimer-bouteille/supprimer-bouteille.component';

@Component({
  selector: 'app-liste-bouteille',
  templateUrl: './liste-bouteille.component.html',
  styleUrls: ['./liste-bouteille.component.scss'],
})

export class ListeBouteilleComponent {
  id: any;
  bouteilles: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private apiVinoService: ApiVinoService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.setLoading(true);
    this.id = this.route.snapshot.paramMap.get('id');

    this.getAllBouteille();
  }

  getAllBouteille() {
    this.apiVinoService
      .listebouteilleCellier(this.id)
      .subscribe((result: any) => {
        this.bouteilles = result;
        this.authService.setLoading(false);
      });
  }

  modifierQuantiteBouteille(quantite: number, cellier: any, bouteille: any) {
    this.apiVinoService
      .modifierQuantite({ quantite: quantite }, cellier, bouteille)
      .subscribe((result: any) => {
        this.getAllBouteille();
      });
  }

  openDialog(bouteille_id: any, cellier_id: any, nom: any) {
    const dialogRef = this.dialog.open(SupprimerBouteilleComponent, {
      data: {
        bouteille_id: bouteille_id,
        cellier_id: cellier_id,
        nom: nom,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllBouteille();
    });
  }
}
