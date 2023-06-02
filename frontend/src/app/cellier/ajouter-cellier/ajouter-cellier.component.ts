import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ApiVinoService } from 'src/app/services/api-vino.service';
import { EnteteAuthComponent } from 'src/app/layout/entete-auth/entete-auth.component';
@Component({
  selector: 'app-ajouter-cellier',
  templateUrl: './ajouter-cellier.component.html',
  styleUrls: ['./ajouter-cellier.component.scss'],
})

export class AjouterCellierComponent {
  ajouterCellier = new FormGroup({
    nom: new FormControl('', Validators.required),
  });
  message:any='';
  urlApi: string;
  private error: boolean = false;

  constructor(
    private entete:EnteteAuthComponent,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private apiVinoService: ApiVinoService
  ) {
    // URL du API backend dans le service api-vino
    this.urlApi = this.apiVinoService.urlApi;
  }

  onSubmit() {
    this.http
      .post<any>(this.urlApi + '/celliers', this.ajouterCellier.value)
      .pipe(
        catchError((error) => {
          this.error = true;
          return EMPTY;
        })
      )
      .subscribe((result: any) => {
        this.error = false;
        
        this.authService.setMessage('Cellier ajouter avec succés');
        this.entete.showMessage();
        this.router.navigate(['/cellier']);
      });
  }

  
}
