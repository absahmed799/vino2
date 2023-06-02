import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiVinoService} from "../../services/api-vino.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/auth/auth-service';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';

@Component({
  selector: 'app-modifier-bouteille',
  templateUrl: './modifier-bouteille.component.html',
  styleUrls: ['./modifier-bouteille.component.scss']
})
export class ModifierBouteilleComponent {

  bouteilleCellier: any
  cellier_id: any
  bouteille_id: any
  formModifier: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute,
    private authService:AuthService,private entete:EnteteAuthComponent, private api: ApiVinoService) {


    this.formModifier = new FormGroup({
      quantite: new FormControl('', Validators.required),
      date_achat: new FormControl('',[Validators.required]),
      garde_jusqua: new FormControl('', [Validators.required]),
      millesime: new FormControl('', [Validators.required]),
      note: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.cellier_id = this.route.snapshot.paramMap.get('cellier_id');
    this.bouteille_id = this.route.snapshot.paramMap.get('bouteille_id');

    this.api.afficherBouittelleCellier(this.cellier_id, this.bouteille_id)
      .subscribe(result => {
        this.bouteilleCellier = result

        this.formModifier.patchValue({
          quantite: this.bouteilleCellier.quantite,
          date_achat: this.bouteilleCellier.date_achat,
          garde_jusqua: this.bouteilleCellier.garde_jusqua,
          millesime: this.bouteilleCellier.millesime,
          note: this.bouteilleCellier.note
        });
      })
  }

  modifierBouteille() {
    if (this.formModifier.valid) {
      let body = this.formModifier.value
      body.bouteille_id = Number(this.bouteille_id)

      this.api.modifierBouteilleCellier(this.cellier_id, this.bouteille_id, body)
        .subscribe(result => {
          this.router.navigate(['/cellier/' + this.cellier_id+ '/bouteille/' + this.bouteille_id])
          this.authService.setMessage('Bouteille est modifié avec succés');
          this.entete.showMessage();
        })
    }
  }
}
