import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

export interface DialogData {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-supprimer-cellier',
  templateUrl: './supprimer-cellier.component.html',
  styleUrls: ['./supprimer-cellier.component.scss']
})
export class SupprimerCellierComponent {

  id: any
  nom: any
  private urlBackend: string = 'http://127.0.0.1:8000/api/celliers';

  constructor(
    public dialogRef: MatDialogRef<SupprimerCellierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.data.id
    this.nom = this.data.nom
  }

  fermerCellier(): void {
    this.dialogRef.close();
  }

  supprimerCellier(id: any) {
    console.log(id)
    this.http.delete(this.urlBackend + '/' + id).subscribe();
    this.dialogRef.close();
    this.router.navigate(['/cellier'])
  }
}
