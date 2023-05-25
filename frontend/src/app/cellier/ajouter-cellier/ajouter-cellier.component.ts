import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth/auth-service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-ajouter-cellier',
  templateUrl: './ajouter-cellier.component.html',
  styleUrls: ['./ajouter-cellier.component.scss']
})
export class AjouterCellierComponent {

  ajouterCellier = new FormGroup({
    nom: new FormControl('', Validators.required)
  })

  public urlBackend: string = 'http://127.0.0.1:8000/api';
  private error: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.http.post<any>(this.urlBackend + '/celliers', this.ajouterCellier.value)
      .pipe(
        catchError(error => {
          this.error = true;
          return EMPTY;
        })
      )
      .subscribe((result: any) => {
      this.error = false;
      this.router.navigate(['/cellier'])
    });
  }

}
