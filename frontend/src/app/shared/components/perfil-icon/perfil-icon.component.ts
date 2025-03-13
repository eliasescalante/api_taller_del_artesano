import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
AuthService
@Component({
  selector: 'app-perfil-icon',
  imports: [],
  templateUrl: './perfil-icon.component.html',
  styleUrl: './perfil-icon.component.css'
})
export class PerfilIconComponent {
  constructor(private router: Router) {}

  goToProfile(): void {
    // Redirige al perfil dentro del dashboard
    this.router.navigate(['/dashboard/perfil']);
  }
}