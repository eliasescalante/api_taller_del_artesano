import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buy',
  imports: [CommonModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent {
  activeTab: 'en-curso' | 'finalizadas' = 'en-curso';
  
  // Datos de ejemplo
  comprasEnCurso: any[] = []; // Vacío para mostrar mensaje
  comprasFinalizadas: any[] = [];
}
