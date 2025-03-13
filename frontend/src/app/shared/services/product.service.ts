import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({ providedIn: 'root' })
export class ProductService {
  // Productos estáticos iniciales (Estos productos deben ser reemplazados por datos de la API)
  private staticProducts: Product[] = [
    {
      id: 1,
      nombre: 'Jarrón de Cerámica Artesanal',
      precio: 45,
      descripcion:
        'Jarrón hecho a mano con diseños únicos, perfecto para decoración.',
      imagen: 'https://picsum.photos/id/237/300/300', // Imagen genérica de cerámica
      categoria: 'Cerámica',
      stock: 10,
      ubicacion: 'Cusco, Perú',
      especificaciones: 'Altura: 30cm, Material: Cerámica, Pintura no tóxica',
    },
  ];

  // Fuente de datos para productos dinámicos (Esto debe ser reemplazado por los productos de la API)
  private dynamicProductsSource = new BehaviorSubject<Product[]>([]);

  // Observable para exponer los productos dinámicos (se mantendrá para productos obtenidos de la API)
  public dynamicProductsPublic$: Observable<Product[]> =
    this.dynamicProductsSource.asObservable();

  // Combina productos estáticos + dinámicos
  // En el futuro, esta función debería fusionar los productos estáticos con los que provengan de la API(Aunque los productos estaticos ya no serán necesarios).
  getAllProducts(): Product[] {
    return [...this.staticProducts, ...this.dynamicProductsSource.value]; // Accede al value para obtener los productos dinámicos
  }

  // Añade un nuevo producto con ID único
  // Aca se tiene cambiar la lógica para enviar el producto a la API en vez de solo agregarlo localmente.
  addProduct(newProduct: Omit<Product, 'id'>): void {
    const newId = this.generateNewId();
    console.log('Nuevo producto recibido:', newProduct);
    const productWithId: Product = {
      ...newProduct,
      id: newId,
      vendedorId: newProduct.vendedorId,
    };

    const currentDynamicProducts = this.dynamicProductsSource.value;
    this.dynamicProductsSource.next([...currentDynamicProducts, productWithId]);
  }

  // Genera un ID único evitando colisiones con los productos estáticos (esto es local, pero deberías obtener un ID de la API más adelante)
  private generateNewId(): number {
    const maxStaticId = Math.max(...this.staticProducts.map((p) => p.id));
    //Se usa dynamicProductsSource.value para calcular el ID, pero en la API se deberia permitir gestione este ID
    return maxStaticId + this.dynamicProductsSource.value.length + 1;
  }

  private normalizeText(text: string): string {
    return text
      .normalize('NFD') // Separa caracteres y diacríticos (ej: 'ç' -> 'c' + '̧')
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
      .toLowerCase();
  }

  // Método de búsqueda
  searchProducts(query: string): Observable<Product[]> {
    const normalizedQuery = this.normalizeText(query);
    const allProducts = this.getAllProducts();
  
    const filtered = allProducts.filter(product => {
      const fieldsToSearch = [
        product.nombre || '', // Manejar posibles undefined
        product.descripcion || '',
        product.categoria || ''
      ];
  
      return fieldsToSearch.some(field => 
        this.normalizeText(field).includes(normalizedQuery)
      );
    });
  
    return of(filtered);
  }
  getProductById(id: number): Product | undefined {
    const allProducts = this.getAllProducts();
    return allProducts.find((product) => product.id === id);
  }
}
