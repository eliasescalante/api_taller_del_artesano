import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../services/cart.service';
import { FavService } from '../../services/fav.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  // Inputs
  @Input() products: Product[] = [];
  @Input() favorites: Product[] = [];
  @Input() isAuthenticated: boolean = false;
  @Input() maxStock: number = 1;
  @Input() selectedProductId: number | null = null;
  @Input() selectedQuantity: number = 1;
  @Input() selectedProduct: Product | null = null;
  @Input() vendedorNames: { [key: number]: string } = {}; 
  @Input() trackByProductId: (index: number, product: Product) => number = (index, product) => product.id;
  @Input() searchQuery: string = '';

  // Outputs
  @Output() toggleFav = new EventEmitter<Product>();
  @Output() showDetails = new EventEmitter<Product>();
  @Output() showQuantitySelector = new EventEmitter<{ productId: number, event: MouseEvent }>();
  @Output() adjustQuantity = new EventEmitter<number>();
  @Output() confirmAddToCart = new EventEmitter<Product>();
  @Output() cancelSelection = new EventEmitter<void>();
  @Output() closeDetails = new EventEmitter<void>();

  // Método trackBy para mejorar el rendimiento

  isFavorite(product: Product): boolean {
    return this.favorites.some(fav => fav.id === product.id);
  }
}