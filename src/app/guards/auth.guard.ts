import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const session = await this.authService.getSession();

    if (session) {
      return true; // Usuario autenticado, puede acceder
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
  }
}
