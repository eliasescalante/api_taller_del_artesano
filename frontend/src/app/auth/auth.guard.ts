import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map((user) => {
        // Verificar autenticación
        if (!user) {
          return this.router.parseUrl('/auth');
        }

        // Declaración única de requiredRole
        const requiredRole = route.data['role'] as string;

        // Verificar rol (user ya está verificado, no es null)
        if (requiredRole && user.role !== requiredRole) {
          return this.router.parseUrl('/home');
        }

        return true;
      })
    );
  }
}