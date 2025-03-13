import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isHidden = false;
  private lastScrollTop = 0;
  private readonly threshold = 10; // diferencia mínima para detectar dirección

  title = "Taller del Artesano";


  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const delta = currentScroll - this.lastScrollTop;

    // Si se hace scroll hacia abajo (y supera el umbral), ocultamos el header
    if (delta > this.threshold) {
      this.isHidden = true;
    }
    // Si se hace scroll hacia arriba (y supera el umbral), mostramos el header
    else if (delta < -this.threshold) {
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll;
  }

  rutaActual: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.rutaActual = this.router.url.split('/')[1]; // Obtiene la primera parte de la URL
    });
  }

}
