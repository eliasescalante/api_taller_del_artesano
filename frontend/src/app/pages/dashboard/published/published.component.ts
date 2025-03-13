import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-published',
  imports: [CommonModule, RouterLink],
  templateUrl: './published.component.html',
  styleUrl: './published.component.css'
})
export class PublishedComponent {
  activeTab: 'venta' | 'vendidos' = 'venta';
  


  productosEnVenta: any[] = []; 
  productosVendidos: any[] = [];
}
