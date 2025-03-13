import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductsComponent } from '../products/products.component';
import { CartService } from '../../services/cart.service';
import { FavService } from '../../services/fav.service';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-recommended',
  imports: [CommonModule, ProductsComponent],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css',
})
export class RecommendedComponent implements OnInit, OnDestroy {
  recommendedProducts: Product[] = [];
  favorites: Product[] = [];
  isAuthenticated: boolean = false;
  maxStock: number = 1;
  selectedProductId: number | null = null;
  selectedQuantity: number = 1;
  selectedProduct: Product | null = null;
  vendedorNames: { [key: number]: string } = {};
  private authSub!: Subscription;
  private favSub!: Subscription;

  @ViewChild('productDetailsCanvas') productDetailsCanvas!: ElementRef;

  @Input() maxProducts: number = 6;

  constructor(
    private productService: ProductService,
    private favService: FavService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRecommendedProducts();
    this.setupSubscriptions();
    this.loadVendedorNames();
    this.authSub = this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  
  }
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.favSub?.unsubscribe();
  }
  // Método trackBy para mejorar el rendimiento
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  private loadRecommendedProducts(): void {
    const allProducts = this.productService.getAllProducts();
    this.recommendedProducts = this.getRandomProducts(allProducts, 6);
  }

  private getRandomProducts(products: Product[], count: number): Product[] {
    // Mezclar array y seleccionar N elementos
    return [...products].sort(() => Math.random() - 0.5).slice(0, count);
  }

  private loadVendedorNames(): void {
    this.recommendedProducts.forEach(product => {
      if (product.vendedorId) {
        const vendedor = this.authService.getUserById(product.vendedorId);
        this.vendedorNames[product.vendedorId] = 
          vendedor?.businessName || vendedor?.name || 'Anónimo';
      }
    });
  }

  private setupSubscriptions(): void {
    this.authSub = this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.favSub = this.favService.favsItems$.subscribe(favs => {
      this.favorites = favs;
    });
  }

  // Método para manejar favoritos
  onToggleFav(product: Product): void {
    this.favService.toggleFav(product);
    console.log('Producto en favoritos:', product);
  }

  // Método para añadir al carrito
  onAddToCart(product: Product): void {
    this.cartService.addProduct(product);
    console.log('Producto añadido al carrito:', product);
  }

  

  // Mostrar detalles del producto
  onShowDetails(product: Product): void {
    this.selectedProduct = product;
    const offcanvas = new window.bootstrap.Offcanvas(
      this.productDetailsCanvas.nativeElement
    );
    offcanvas.show();
  }

  // Cerrar detalles
  onCloseDetails(): void {
    const offcanvas = window.bootstrap.Offcanvas.getInstance(
      this.productDetailsCanvas.nativeElement
    );
    offcanvas?.hide();
    this.selectedProduct = null;
  }

  isFavorite(product: Product): boolean {
    const currentFavs = this.favService.favsSubject.getValue(); // Acceder directamente
    return currentFavs.some((fav: Product) => fav.id === product.id);
  }

  onShowQuantitySelector(event: { productId: number; event: MouseEvent }): void {
    event.event.stopPropagation();
    this.selectedProductId = event.productId;
    const product = this.recommendedProducts.find(p => p.id === event.productId);
    this.maxStock = product?.stock || 1;
  }

  onAdjustQuantity(amount: number): void {
    this.selectedQuantity = Math.max(
      1, 
      Math.min(this.selectedQuantity + amount, this.maxStock)
    );
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
    }
  }

  onCancelSelection(): void {
    this.selectedProductId = null;
    this.selectedQuantity = 1;
  }



}
