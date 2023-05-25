import {Component, OnInit} from '@angular/core';
import {FormControl,FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, of, pipe, startWith} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import { ApiVinoService } from 'src/app/services/api-vino.service';

@Component({
  selector: 'app-ajouter-bouteille',
  templateUrl: './ajouter-bouteille.component.html',
  styleUrls: ['./ajouter-bouteille.component.scss']
})
export class AjouterBouteilleComponent implements OnInit{
  
  myControl = new FormControl('');
  bouteilles: any[] = [];
  filteredOptions: Observable<any> | undefined;
  bouteilleSelected: any;
  dateFormControl = new FormControl();
  formAjout:FormGroup;
  
  constructor(private http: HttpClient , private api:ApiVinoService) {
     this.formAjout = new FormGroup({
      quantite: new FormControl(""),
      nom: new FormControl("", [Validators.required, Validators.minLength(3)]),
      date_achat: new FormControl("",[Validators.required, Validators.minLength(3)]),
      //prix: new FormControl("",[Validators.required, Validators.min(0)]),
      garde: new FormControl("", [Validators.required]),
      millesime: new FormControl(""),
      type: new FormControl(""),
      pays: new FormControl(""),
      note: new FormControl(""),
      id: new FormControl("")
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


  private _filter(value: string): Observable<any[]> {
    return this.api.getBouteilles().pipe(
      map(response => response.filter((option: { bouteille_nom: string; }) => {
        return option.bouteille_nom.toLowerCase().includes(value.toLowerCase())
      }))
    )
  }

  autoCompleteForm(option: any) {
    this.bouteilleSelected = option;
  }

  ajouterBouteille(){
    console.log(this.formAjout.value);    
  }
 
}
