import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, of, pipe, startWith} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ajouter-bouteille',
  templateUrl: './ajouter-bouteille.component.html',
  styleUrls: ['./ajouter-bouteille.component.scss']
})
export class AjouterBouteilleComponent implements OnInit{
  private urlBackend: string = 'http://127.0.0.1:8000/api';
  myControl = new FormControl('');
  bouteilles: any[] = [];
  filteredOptions: Observable<any> | undefined;
  bouteilleSelected: any;

  constructor(private http: HttpClient) {
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
      this.http.get<any>(this.urlBackend + '/bouteilles')
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
}
