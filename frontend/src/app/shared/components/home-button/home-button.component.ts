import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-button',
  imports: [],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goHome(): void {
    const currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');
    
    if (currentPath.includes('perfil/cliente')) {
      this.router.navigate(['/cliente']);
    } else if (currentPath.includes('perfil/vendedor')) {
      this.router.navigate(['/vendedor']);
    } else {
      this.router.navigate(['/home']); // Fallback si no está en ninguna de esas rutas
    }
  }

}
