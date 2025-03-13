import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CategoryComponent } from "../../core/category/category.component";
import { FooterComponent } from "../../core/footer/footer.component";
import { PerfilIconComponent } from "../../shared/components/perfil-icon/perfil-icon.component";
import { SellButtonComponent } from "../../shared/components/sell-button/sell-button.component";
import { CartComponent } from "../../shared/components/cart/cart.component";
import { FavsIconComponent } from "../../shared/components/favs-icon/favs-icon.component";
import { SearchComponent } from "../../shared/components/search/search.component";
import { HeaderComponent } from "../../core/header/header.component";
import { LogoutButtonComponent } from "../../shared/components/logout-button/logout-button.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CategoryComponent, FooterComponent, PerfilIconComponent, SellButtonComponent, CartComponent, FavsIconComponent, SearchComponent, HeaderComponent, LogoutButtonComponent,RouterLink, RouterOutlet,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  get isVendedor(): boolean {
    return this.currentUser?.role === 'vendedor';
  }
}
