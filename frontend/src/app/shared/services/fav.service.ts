import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FavService {
  // Inicializamos el BehaviorSubject con un array vacío (Mas adelante, este array debería estar poblado con los favoritos del usuario, obtenidos desde la API)
  public favsSubject = new BehaviorSubject<Product[]>([]);

  // Exponemos el observable para que lo pueda consumir el componente (Este observable debería reflejar los datos que vienen de la API)
  public favsItems$: Observable<Product[]> = this.favsSubject.asObservable();

  constructor() {}

  // Toggle para añadir o quitar un producto de los favoritos
  toggleFav(product: Product): void {
    const currentFavs = this.favsSubject.getValue();
    const index = currentFavs.findIndex((fav) => fav.id === product.id);
    if (index !== -1) {
      // Si el producto ya existe en favoritos, lo eliminamos
      this.favsSubject.next(currentFavs.filter((fav) => fav.id !== product.id));
      // Acá también se debería llamar a la API para actualizar los favoritos del usuario
    } else {
      // Si no está en favoritos, lo agregamos
      this.favsSubject.next([...currentFavs, product]);
      // Se deberia enviar esta acción a la API para actualizar los favoritos del usuario en el backend
    }
  }

  // Limpiar todos los favoritos
  clearFavs(): void {
    this.favsSubject.next([]);
    // Acá se deberías hacer la llamada a la API para borrar los favoritos del backend
  }
  getCurrentFavs(): Product[] {
    return this.favsSubject.getValue();
  }
}
