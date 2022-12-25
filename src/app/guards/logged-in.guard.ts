import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtService} from "../shared/services/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private jwtService: JwtService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    if (this.jwtService.getUser()) {
      console.log('found user')
      if (this.jwtService.isTokenExpired()) {
        return false;
      } else {
        return true;
      }
    } else {
      console.log("no user")
      return new Promise(resolve => {
        return false;
      });
    }
  }
}
