import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  activeTab: 'products' | 'profiles' | 'searches' = 'products';

  favoriteProducts: any[] = []; 
  favoriteProfiles: any[] = []; 



  setActiveTab(tab: 'products' | 'profiles' | 'searches') {
    this.activeTab = tab;
  }
}
