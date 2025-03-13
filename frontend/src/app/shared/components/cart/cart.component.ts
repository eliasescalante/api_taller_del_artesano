import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';

declare const bootstrap: any;

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>; // Declaración

  constructor(
    public cartService: CartService,
    private productService: ProductService
  ) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  trackByProductId(index: number, item: CartItem): number {
    return item.producto.id; // Usar el ID como identificador único
  }

  incrementar(item: CartItem): void {
    const stockDisponible = this.getProductStock(item.producto.id);
    if (item.cantidad < stockDisponible) {
      this.cartService.updateQuantity(item.producto.id, item.cantidad + 1);
    }
  }

  decrementar(item: CartItem): void {
    if (item.cantidad > 1) {
      this.cartService.updateQuantity(item.producto.id, item.cantidad - 1);
    }
  }

  getProductStock(productId: number): number {
    const product = this.productService.getProductById(productId);
    return product?.stock || 1; // Si no existe, usar 1 como valor seguro
  }


  eliminar(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  // trackBy para optimizar el *ngFor
  trackByProduct(index: number, item: CartItem): number {
    return item.producto.id;
  }

  toggleCartDetails(): void {
    const offcanvas = document.getElementById('cartOffcanvas');
    if (offcanvas) {
      // Crear una instancia del offcanvas de Bootstrap
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
      // Alternar entre abrir y cerrar el offcanvas
      bsOffcanvas.toggle();
    }
  }

  // Función vaciarCarrito dentro de la clase CartComponent
  vaciarCarrito(): void {
    this.cartService.clearCart();
  }
  updateQuantity(productId: number, newQuantity: number): void {
    this.cartService.updateQuantity(productId, newQuantity); // Llama al servicio
  }
}
