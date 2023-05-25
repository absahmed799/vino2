import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiVinoService } from 'src/app/services/api-vino.service';

@Component({
  selector: 'app-liste-bouteille',
  templateUrl: './liste-bouteille.component.html',
  styleUrls: ['./liste-bouteille.component.scss'],
})
export class ListeBouteilleComponent {
  public urlBackend: string = 'http://127.0.0.1:8000/api';
  id: any;
  bouteilles: any;
  cellier: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiVinoService
  ) {}

  ngOnInit() {
    // ID du cellier à partir des paramètres de l'URL
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    // Méthode du service pour récupérer les données du cellier
    this.api.getCellierParid(this.id).subscribe(
      (response: any) => {
        this.cellier = response; // Stocker les données du cellier dans la variable
      },
      (error: any) => {
        console.error(error);
      }
    );

    //this.http.get<any>(this.urlBackend + '/celliers/' + this.id + '/bouteilles')
    this.api.listebouteilleCellier(this.id).subscribe((result: any) => {
      console.log(result);
      this.bouteilles = result;
    });
  }

  modifierQuantiteBouteille(quantite: number, cellier: any, bouteille: any) {
    console.log(cellier);
    console.log(bouteille);
    console.log(quantite);

    this.api
      .modifierQuantite({ quantite: quantite }, cellier, bouteille)
      .subscribe((result: any) => {
        console.log(result);
        this.ngOnInit();
      });
  }
}
