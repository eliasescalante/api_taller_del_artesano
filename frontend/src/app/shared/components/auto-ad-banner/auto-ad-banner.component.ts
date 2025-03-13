import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auto-ad-banner',
  imports: [CommonModule],
  templateUrl: './auto-ad-banner.component.html',
  styleUrl: './auto-ad-banner.component.css'
})
export class AutoAdBannerComponent {
  currentPromo = 1;

  title = "Taller del Artesano";


  constructor() {
    setInterval(() => {
      const promoElement = document.getElementById(`promo${this.currentPromo}`);
      if (promoElement) {
        promoElement.classList.add("d-none");
      }
      this.currentPromo = this.currentPromo === 1 ? 2 : 1;
      const nextPromoElement = document.getElementById(`promo${this.currentPromo}`);
      if (nextPromoElement) {
        nextPromoElement.classList.remove("d-none");
      }
    }, 6000);
  }
}
