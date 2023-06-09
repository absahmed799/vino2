import {Component, OnInit} from '@angular/core';
import {FormControl,FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, of, pipe, startWith} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import { ApiVinoService } from 'src/app/services/api-vino.service';
import {ActivatedRoute, Router} from "@angular/router";
import { AuthService } from 'src/app/auth/auth-service';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';

@Component({
  selector: 'app-ajout-bouteille',
  templateUrl: './ajout-bouteille.component.html',
  styleUrls: ['./ajout-bouteille.component.scss']
})

export class AjoutBouteilleComponent  {
  urlApi: string;
  myControl = new FormControl('');
  bouteilles: any[] = [];
  filteredOptions: Observable<any> | undefined;
  bouteilleSelected: any;
  dateFormControl = new FormControl();
  formAjout:FormGroup;

  utilisateur_id: any

  constructor(private http: HttpClient , private apiVinoService:ApiVinoService,
     private route: ActivatedRoute, private router: Router , private authService : AuthService, private entete:EnteteAuthComponent) {
    // URL du API backend dans le service api-vino
    this.urlApi = this.apiVinoService.urlApi;
    
     this.formAjout = new FormGroup({
     
      quantite: new FormControl("", Validators.required),
            
    })
  }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this._filter(val || '')
      }),
    );
  }

  getBouteilles() {
    return this.bouteilles.length ?
      of(this.bouteilles) :
      this.http.get<any>(this.urlApi + '/bouteilles')
        .pipe(
          tap(data => this.bouteilles = data)
        )
  }

  private _filter(value: string): Observable<any[]> {

    return this.getBouteilles().pipe(
      map(response => response.filter((option: { bouteille_nom: string; }) => {
        return option.bouteille_nom.toLowerCase().includes(value.toLowerCase())
      }))
    )
  }

  autoCompleteForm(option: any) {
    this.bouteilleSelected = option;
  }

  ajouterBouteille(){
    if (this.formAjout.valid) {
      let valueForm = this.formAjout.value;
      let body = {
        
        quantite: this.formAjout.value.quantite,
        bouteille_id: this.bouteilleSelected.id
      }
      
      this.apiVinoService.ajouterBouteilleListeAchat( body)
        .subscribe((result: any) => {
        this.router.navigate(['/listeAchat'])
        this.authService.setMessage("La Bouteille est ajouté avec succés" );
            this.entete.showMessage();
      })
    }
  }
}
