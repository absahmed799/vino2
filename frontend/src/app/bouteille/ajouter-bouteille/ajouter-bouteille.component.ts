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
  selector: 'app-ajouter-bouteille',
  templateUrl: './ajouter-bouteille.component.html',
  styleUrls: ['./ajouter-bouteille.component.scss'],
})
export class AjouterBouteilleComponent implements OnInit {
  urlApi: string;
  myControl = new FormControl('');
  bouteilles: any[] = [];
  filteredOptions: Observable<any> | undefined;
  bouteilleSelected: any;
  dateFormControl = new FormControl();
  formAjout: FormGroup;

  cellier_id: any;

  constructor(
    private http: HttpClient,
    private apiVinoService: ApiVinoService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService, private entete:EnteteAuthComponent
  
  ) {
    // URL du API backend dans le service api-vino
    this.urlApi = this.apiVinoService.urlApi;

    this.formAjout = new FormGroup({
      quantite: new FormControl('', Validators.required),
      date_achat: new FormControl('', [Validators.required]),
      garde_jusqua: new FormControl('', [Validators.required]),
      millesime: new FormControl('', [Validators.required]),
      note: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cellier_id = this.route.snapshot.paramMap.get('id');
    this.authService.setId_cellier(this.cellier_id);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this._filter(val || '');
      })
    );
  }

  getBouteilles() {
    return this.bouteilles.length
      ? of(this.bouteilles)
      : this.http
          .get<any>(this.urlApi + '/bouteilles')
          .pipe(tap((data) => (this.bouteilles = data)));
  }

  private _filter(value: string): Observable<any[]> {
    return this.getBouteilles().pipe(
      map((response) =>
        response.filter((option: { bouteille_nom: string }) => {
          return option.bouteille_nom
            .toLowerCase()
            .includes(value.toLowerCase());
        })
      )
    );
  }

  autoCompleteForm(option: any) {
    this.bouteilleSelected = option;
  }

  ajouterBouteille() {
    if (this.formAjout.valid) {
      let valueForm = this.formAjout.value;
      let body = {
        millesime: this.formAjout.value.millesime,
        garde_jusqua: this.formAjout.value.garde_jusqua,
        date_achat: this.formAjout.value.date_achat?.getTime(),
        quantite: this.formAjout.value.quantite,
        note: this.formAjout.value.note,
        bouteille_id: this.bouteilleSelected.id,
      };

      this.apiVinoService
        .ajouterBouteille(this.cellier_id, body)
        .subscribe((result: any) => {
          this.authService.setMessage('Bouteille est ajouté avec succés');
          this.entete.showMessage();
          this.router.navigate(['/cellier/' + this.cellier_id + '/bouteille']);
        });
    }
  }
}
