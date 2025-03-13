import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-sell-button',
  imports: [],
  templateUrl: './sell-button.component.html',
  styleUrl: './sell-button.component.css'
})
export class SellButtonComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización aquí si es necesario
  }

  toggleRoute(role: string): void {
    this.authService.updateUserRole(role)
      .subscribe(() => {
        this.router.navigate(['/dashboard/vendor']);
      });
  }
  
}