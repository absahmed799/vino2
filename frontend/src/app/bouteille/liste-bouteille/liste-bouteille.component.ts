import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-liste-bouteille',
  templateUrl: './liste-bouteille.component.html',
  styleUrls: ['./liste-bouteille.component.scss']
})
export class ListeBouteilleComponent {
  public urlBackend: string = 'http://127.0.0.1:8000/api';
  id: any;
  cellier: any

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(this.urlBackend + '/celliers/' + this.id + '/bouteilles')
      .subscribe((result: any) => {
        console.log(result)
        this.cellier = result
      });
  }
}
