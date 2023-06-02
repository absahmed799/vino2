import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

interface Signaler {
  titre_erreur: string;
  description_erreur: string;
  utilisateur_id: number;
}

@Component({
  selector: 'app-table-signaler',
  templateUrl: './table-signaler.component.html',
  styleUrls: ['./table-signaler.component.scss']
})
export class TableSignalerComponent implements OnInit {
  dataSource: MatTableDataSource<Signaler> = new MatTableDataSource<Signaler>([]);
  displayedColumns: string[] = ['titre_erreur', 'description_erreur', 'utilisateur_id'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<Signaler[]>('http://127.0.0.1:8000/api/signaler')
      .subscribe(
        data => {
          this.dataSource.data = data;
        },
        error => {
          console.log('Error fetching signaler data:', error);
        }
      );
  }
}
