import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth-service";
import {MatDialog} from "@angular/material/dialog";
import {SupprimerCellierComponent} from "../supprimer-cellier/supprimer-cellier.component";

@Component({
  selector: 'app-liste-cellier',
  templateUrl: './liste-cellier.component.html',
  styleUrls: ['./liste-cellier.component.scss']
})
export class ListeCellierComponent {
  private urlBackend: string = 'http://127.0.0.1:8000/api/celliers';
  ListeCelliers: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllCelliers()
  }

  getAllCelliers () {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.authService.getBearerToken()
      })
    };
      this.http.get(this.urlBackend, httpOption).subscribe((results: any) => {
        this.ListeCelliers = results
      });
  }

  openDialog(id: bigint, nom: string): void {
    const dialogRef = this.dialog.open(SupprimerCellierComponent, {
      data: {id: id, nom: nom},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCelliers()
    });
  }
}
