import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./service/auth.service";
import { Observable, map, take } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.authService.getUser().pipe(
        take(1),
        map(user => {
          if (user) {
            return true;
          } else {
            return this.router.createUrlTree(['/login']);
          }
        })
      );
    }
  }