import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-entete-auth',
  templateUrl: './entete-auth.component.html',
  styleUrls: ['./entete-auth.component.scss']
})
export class EnteteAuthComponent {
  constructor(private location: Location) {}

  retourner(): void {
    this.location.back();
  }
}
