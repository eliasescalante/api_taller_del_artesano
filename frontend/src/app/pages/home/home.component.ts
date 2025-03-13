import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryComponent } from '../../core/category/category.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { HeaderComponent } from '../../core/header/header.component';
import { AutoAdBannerComponent } from '../../shared/components/auto-ad-banner/auto-ad-banner.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { AuthButtonComponent } from "../../shared/components/auth-button/auth-button.component";
import { ProductsComponent } from "../../shared/components/products/products.component";
import { RouterOutlet } from '@angular/router';
import { RecommendedComponent } from "../../shared/components/recommended/recommended.component";

@Component({
  selector: 'app-home',
  imports: [FooterComponent, AutoAdBannerComponent, CategoryComponent, HeaderComponent, CommonModule, SearchComponent, AuthButtonComponent, RouterOutlet, RecommendedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
