import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { tap } from 'rxjs/operators';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../../shared/components/products/products.component';
import { AuthService } from '../../auth/auth.service';
import { FavService } from '../../shared/services/fav.service';
import { CartService } from '../../shared/services/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css',
})
export class ResearchComponent implements OnInit, OnDestroy {
  private queryParamsSubscription!: Subscription;
  searchQuery: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private querySub!: Subscription; 

  favorites: Product[] = [];
  isAuthenticated: boolean = false;
  maxStock: number = 1;
  selectedProductId: number | null = null;
  selectedQuantity: number = 1;
  selectedProduct: Product | null = null;
  vendedorNames: { [key: number]: string } = {};

  constructor(
    public authService: AuthService,
    private favService: FavService,
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,

  ) {
    this.products = this.productService.getAllProducts();
    this.filteredProducts = this.products;
    this.favService.favsItems$.subscribe((favs) => (this.favorites = favs));
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.products.forEach((product) => {
      if (product.vendedorId) {
        const vendedor = this.authService.getUserById(product.vendedorId);
        this.vendedorNames[product.vendedorId] = 
          vendedor?.businessName ||  // Primero intenta obtener el nombre del negocio
          vendedor?.name ||          // Si no existe, usa el nombre personal
          'Anónimo';                // Valor por defecto
      }
    });
  }

  ngOnInit() {
    this.querySub = this.route.queryParams.pipe(
      tap((params: Params) => { // Especificar tipo Params
        this.searchQuery = params['query'] || '';
        this.executeSearch(this.searchQuery);
      })
    ).subscribe();
  }

  private executeSearch(query: string): void {
    if (!query) {
      this.filteredProducts = []; // Vacía resultados
      return;
    }
  
    this.productService.searchProducts(query).subscribe({
      next: (results) => {
        this.filteredProducts = results;
        // Mantener el query en la UI aunque no haya resultados
        this.searchQuery = query; 
      },
      error: (err) => console.error('Error en búsqueda:', err)
    });
  }


  ngOnDestroy() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }



  onToggleFav(product: Product): void {

    this.favService.toggleFav(product);
  }

  onShowQuantitySelector(event: { productId: number; event: MouseEvent }): void {
    event.event.stopPropagation();
    this.selectedProductId = event.productId;
    const currentProduct = this.products.find((p) => p.id === event.productId);
    this.maxStock = currentProduct?.stock || 1;
    this.selectedQuantity = 1; // Resetear cantidad
  }

  onAdjustQuantity(amount: number): void {
    const newQuantity = this.selectedQuantity + amount;
    this.selectedQuantity = Math.max(1, Math.min(newQuantity, this.maxStock));
  }

  getBusinessName(vendedorId: number): string | null {
    const vendedor = this.authService.getUserById(vendedorId);
    return vendedor?.businessName || null;
  }

  onConfirmAddToCart(product: Product): void {
    if (this.selectedQuantity > 0) {
      const fullProduct = this.productService.getProductById(product.id);
      if (fullProduct) {
        for (let i = 0; i < this.selectedQuantity; i++) {
          this.cartService.addProduct(fullProduct);
        }
      }
      this.selectedProductId = null;
      this.selectedQuantity = 1; // Resetear cantidad
    }
  }

  onCancelSelection(): void {
    this.selectedProductId = null;
    this.selectedQuantity = 1;
  }

  @ViewChild('productDetailsCanvas') productDetailsCanvas!: ElementRef;

  // Método para mostrar detalles
  onShowDetails(product: Product): void {
    this.selectedProduct = product;

    // Inicializar offcanvas
    const offcanvas = new window.bootstrap.Offcanvas(
      this.productDetailsCanvas.nativeElement
    );
    offcanvas.show();
  }

  // Método para cerrar detalles
  onCloseDetails(): void {
    const offcanvas = window.bootstrap.Offcanvas.getInstance(
      this.productDetailsCanvas.nativeElement
    );
    offcanvas?.hide();
    this.selectedProduct = null;
  }
}
