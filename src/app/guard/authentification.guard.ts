import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../service/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {
  constructor(   private authService: AuthentificationService,
    private router: Router){}

 canActivate(): boolean {
    console.log("authguard : "+this.authService.isLoggedIn());
    
    console.log("authguard : "+this.authService.getToken());
    
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
