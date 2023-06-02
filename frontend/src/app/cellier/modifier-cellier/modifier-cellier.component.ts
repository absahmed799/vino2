import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth-service";
import {ActivatedRoute, Router} from "@angular/router";
import { ApiVinoService } from 'src/app/services/api-vino.service';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';

@Component({
  selector: 'app-modifier-cellier',
  templateUrl: './modifier-cellier.component.html',
  styleUrls: ['./modifier-cellier.component.scss']
})
export class ModifierCellierComponent {

  modifierCellier = new FormGroup({
    nom: new FormControl('', Validators.required)
  });
  nom: any ;
  id: any;

  constructor(private http: HttpClient, private authService: AuthService,
    private entete:EnteteAuthComponent, private router: Router, private route: ActivatedRoute , private api:ApiVinoService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
      this.api.getCellierParid(this.id).subscribe((result: any) => {
        this.nom = result.nom
      });
  }

  onSubmit() {
    
      this.api.editCellier(this.id, this.modifierCellier.value).subscribe((result: any) => {
        this.router.navigate(['/cellier'])
        this.authService.setMessage('Cellier est modifié avec succés');
        this.entete.showMessage();
      });
  }
}
