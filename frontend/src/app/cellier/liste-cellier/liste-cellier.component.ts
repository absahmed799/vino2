import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth-service";
import {MatDialog} from "@angular/material/dialog";
import {SupprimerCellierComponent} from "../supprimer-cellier/supprimer-cellier.component";
import { ApiVinoService } from 'src/app/services/api-vino.service';

@Component({
  selector: 'app-liste-cellier',
  templateUrl: './liste-cellier.component.html',
  styleUrls: ['./liste-cellier.component.scss']
})
export class ListeCellierComponent {

  ListeCelliers: any[] = [];
  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService, public dialog: MatDialog ,private api:ApiVinoService) {
   
  }

  ngOnInit(): void {
    this.authService.setLoading(true);
     this.api.listeCelliers().subscribe((liste:any)=>{
      console.log(liste);
      
      this.authService.setLoading(false);
      this.ListeCelliers = liste;
    })
  }

 

  openDialog(id: bigint, nom: string): void {
    const dialogRef = this.dialog.open(SupprimerCellierComponent, {
      data: {id: id, nom: nom},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
}
