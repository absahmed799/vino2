import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer-auth',
  templateUrl: './footer-auth.component.html',
  styleUrls: ['./footer-auth.component.scss']
})
export class FooterAuthComponent {
  nom: string = '';
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.nom = this.nom = this.authService.getUserData() ?? ''
  }
  deconnexion() {
    this.authService.removeBearerToken();
    this.router.navigate(['/login']);
  }
}
