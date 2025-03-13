import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  isHidden = false;
  private lastScrollTop = 0;
  private readonly threshold = 10; // diferencia mínima para detectar dirección

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const delta = currentScroll - this.lastScrollTop;

    // Si se hace scroll hacia abajo (y supera el umbral), ocultamos category
    if (delta > this.threshold) {
      this.isHidden = true;
    }
    // Si se hace scroll hacia arriba (y supera el umbral), mostramos category
    else if (delta < -this.threshold) {
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll;
  }
}
