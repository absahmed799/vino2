import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  pipe,
  startWith,
} from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiVinoService } from 'src/app/services/api-vino.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';

@Component({
  selector: 'app-ajout-bouteille-non-lister',
  templateUrl: './ajout-bouteille-non-lister.component.html',
  styleUrls: ['./ajout-bouteille-non-lister.component.scss'],
})

export class AjoutBouteilleNonListerComponent implements OnInit {
  urlApi: string;
  myControl = new FormControl('');
  bouteilles: any[] = [];
  filteredOptions: Observable<any> | undefined;
  bouteilleSelected: any;
  dateFormControl = new FormControl();
  formAjout: FormGroup;
  paysList: any[] = [];
  cellier_id: any;

  constructor(
    private entete:EnteteAuthComponent,
    private http: HttpClient,
    private apiVinoService: ApiVinoService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // URL du API backend dans le service api-vino
    this.urlApi = this.apiVinoService.urlApi;
    this.formAjout = new FormGroup({
      nom: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      prix: new FormControl('', Validators.required),
      quantite: new FormControl('', Validators.required),
      date_achat: new FormControl('', [Validators.required]),
      garde_jusqua: new FormControl('', [Validators.required]),
      millesime: new FormControl('', [Validators.required]),
      note: new FormControl('', Validators.required),
      format: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.authService.getId_cellier().subscribe((id) => {
      this.cellier_id = id;
    });
    this.getPaysList();
  }

  getPaysList() {
    this.apiVinoService.getPaysList().subscribe((data: any) => {
      this.paysList = data;
    });
  }

  ajouterBouteille() {
    if (this.formAjout.valid) {
      let valueForm = this.formAjout.value;

      let body = {
        nom: this.formAjout.value.nom.toString(),
        type: this.formAjout.value.type.toString(),
        pays: this.formAjout.value.pays.toString().toString(),
        description: this.formAjout.value.description.toString(),
        prix: this.formAjout.value.prix.toString(),
        millesime: this.formAjout.value.millesime.toString(),
        garde_jusqua: this.formAjout.value.garde_jusqua.toString(),
        date_achat: this.formAjout.value.date_achat?.getTime(),
        quantite: this.formAjout.value.quantite.toString(),
        note: this.formAjout.value.note.toString(),
        cellier_id: this.cellier_id.toString(),
        format:this.formAjout.value.format.toString()
        
      };
      console.log(body);

      this.apiVinoService
        .ajouterBouittelleNonLister(this.cellier_id, body)
        .subscribe((result: any) => {
          this.router.navigate(['/cellier/' + this.cellier_id + '/bouteille']);
          this.authService.setMessage('Bouteille est ajouter avec succés');
          this.entete.showMessage();
        });
    }
  }
  
}
