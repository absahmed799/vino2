import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GuestGuard implements CanActivate{

  constructor(private authServ: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authServ.verifConnection().pipe(
      map(estConnecte => {
        if (estConnecte) {
          return this.router.createUrlTree(['/cellier']);
        } else {
          return true;
        }
      })
    );
  }

}
