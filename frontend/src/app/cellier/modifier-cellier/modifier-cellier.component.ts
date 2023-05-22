import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modifier-cellier',
  templateUrl: './modifier-cellier.component.html',
  styleUrls: ['./modifier-cellier.component.scss']
})
export class ModifierCellierComponent {
  public urlBackend: string = 'http://127.0.0.1:8000/api';
  modifierCellier = new FormGroup({
    nom: new FormControl('', Validators.required)
  });
  nom: any ;
  id: any;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(this.urlBackend + '/celliers/' + this.id )
      .subscribe((result: any) => {
        this.nom = result.nom
      });
  }

  onSubmit() {
    this.http.put<any>(this.urlBackend + '/celliers/' + this.id, this.modifierCellier.value)
      .pipe(
        catchError(error => {
          return EMPTY;
        })
      )
      .subscribe((result: any) => {
        this.router.navigate(['/cellier'])
      });
  }
}
