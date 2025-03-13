import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  
  constructor(private productService: ProductService) {} 

  // Método para agregar un producto al carrito
  addProduct(product: Product): void {
    const existingItem = this.cartItemsSubject.value.find(item => item.producto.id === product.id);
    
    if (existingItem) {
      this.updateQuantity(product.id, existingItem.cantidad + 1);
    } else {
      // Asegura que el producto tenga la propiedad stock
      const newItem: CartItem = {
        producto: {
          ...product,
          stock: product.stock ?? 1, // Asigna valor por defecto si es undefined
        },
        cantidad: 1,
        total: product.precio
      };
      this.cartItemsSubject.next([...this.cartItemsSubject.value, newItem]);
    }
  }

  // Método para actualizar la cantidad de un producto
  updateQuantity(productId: number, newQuantity: number): void {
    const producto = this.productService.getProductById(productId);
    if (!producto) return;
  
    newQuantity = Math.min(newQuantity, producto.stock);
    newQuantity = Math.max(newQuantity, 1);
  
    const updatedItems = this.cartItemsSubject.value.map((item) => 
      item.producto.id === productId 
        ? { ...item, cantidad: newQuantity, total: producto.precio * newQuantity } 
        : item
    );
  
    this.cartItemsSubject.next(updatedItems); // Notifica a los suscriptores
  }
  // Método para eliminar un producto del carrito
  removeProduct(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.filter(
      item => item.producto.id !== productId
    );
    this.cartItemsSubject.next(updatedItems);
  }

  // Método para calcular el total del carrito
  getTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (item.producto.precio * item.cantidad), 
      0
    );
  }

  // Método para vaciar el carrito
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
    // Método para obtener el total de items
    getTotalItems(): number {
      return this.cartItemsSubject.value.reduce(
        (total, item) => total + item.cantidad, 
        0
      );
    }
}