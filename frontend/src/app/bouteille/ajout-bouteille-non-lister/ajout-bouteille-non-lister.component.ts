import {Component, OnInit} from '@angular/core';
import {FormControl,FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, of, pipe, startWith} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import { ApiVinoService } from 'src/app/services/api-vino.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ajout-bouteille-non-lister',
  templateUrl: './ajout-bouteille-non-lister.component.html',
  styleUrls: ['./ajout-bouteille-non-lister.component.scss']
})
export class AjoutBouteilleNonListerComponent implements OnInit{
  
  myControl = new FormControl('');
  bouteilles: any[] = [];
  filteredOptions: Observable<any> | undefined;
  bouteilleSelected: any;
  dateFormControl = new FormControl();
  formAjout:FormGroup;

  cellier_id: any

  constructor(private http: HttpClient , private api:ApiVinoService,
     private route: ActivatedRoute, private router: Router) {
     this.formAjout = new FormGroup({
     nom:new FormControl("", Validators.required),
     pays:new FormControl("", Validators.required),
     type:new FormControl("", Validators.required),
     description:new FormControl("", Validators.required),
     prix:new FormControl("", Validators.required),
      quantite: new FormControl("", Validators.required),
      date_achat: new FormControl("",[Validators.required]),
      garde_jusqua: new FormControl("", [Validators.required]),
      millesime: new FormControl("", [Validators.required]),
      note: new FormControl("", Validators.required),
      
    })
  }

  ngOnInit() {

    this.cellier_id = this.route.snapshot.paramMap.get('id');

  
  }



 

  ajouterBouteille(){
    
    if (this.formAjout.valid) {
      let valueForm = this.formAjout.value;
   
      let body = {
        nom:this.formAjout.value.nom,
        type:this.formAjout.value.type ,
        pays:this.formAjout.value.pays ,
        description:this.formAjout.value.description,
        prix:this.formAjout.value.prix ,
        millesime: this.formAjout.value.millesime,
        garde_jusqua: this.formAjout.value.garde_jusqua,
        date_achat: this.formAjout.value.date_achat?.getTime(),
        quantite: this.formAjout.value.quantite,
        note: this.formAjout.value.note,
        bouteille_id: this.bouteilleSelected.id
      }

      this.api.afficherBouittelleNonLister(this.cellier_id,body)
        .subscribe((result: any) => {
        this.router.navigate(['/cellier/' + this.cellier_id +'/bouteille'])
      })
    }
  }
}