import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
declare var bootstrap: any;
import { FavService } from '../../services/fav.service';

@Component({
  selector: 'app-favs-icon',
  imports: [CommonModule],
  templateUrl: './favs-icon.component.html',
  styleUrl: './favs-icon.component.css'
})
export class FavsIconComponent {
  constructor(public favsService: FavService) {}


  toggleFavsDetails(): void {
    const favsOffcanvasElement = document.getElementById('favsOffcanvas');
    if (favsOffcanvasElement) {
      let offcanvas = bootstrap.Offcanvas.getInstance(favsOffcanvasElement);
      if (!offcanvas) {
        offcanvas = new bootstrap.Offcanvas(favsOffcanvasElement);
      }
      offcanvas.toggle();
    } else {
      console.error('No se encontró el elemento con id "favsOffcanvas"');
    }
  }

  clearFavorites(): void {
    // Aquí implementas la lógica para vaciar tus favoritos
    this.favsService.clearFavs();
  }


}
