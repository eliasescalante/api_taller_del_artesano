import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  searchQuery = '';
  searchResults: Product[] = [];
  filteredProducts: Product[] = [];


  filterProducts(products: Product[]) {
    if (this.searchQuery) {
      this.filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = products;
    }
  }

  performSearch(): void {
    const query = this.searchQuery.trim();
  
    // Solo navegar si hay query válido
    if (query) {
      this.router.navigate(['research'], { 
        relativeTo: this.route,
        queryParams: { query },
        queryParamsHandling: 'merge'
      });
    }
    // Si está vacío pero el usuario hizo click en "X" (no en Enter)
    else {
      const parentRoute = this.getParentRoute();
      this.router.navigate([parentRoute]); // Redirige solo si se activó clearSearch()
    }
  }

  constructor(
    private location: Location
  ) {}

  private getParentRoute(): string {
    const currentRoute = this.router.url;
    
    if (currentRoute.startsWith('/dashboard')) {
      return '/dashboard';
    } else if (currentRoute.startsWith('/home')) {
      return '/home';
    }
    
    return '/';
  }
  clearSearch(): void {
    this.searchQuery = '';
    const parentRoute = this.getParentRoute();
    this.router.navigate([parentRoute]); // Redirige solo aquí
  }

}
