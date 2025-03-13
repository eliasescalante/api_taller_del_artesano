export interface Product {
  id: number; // desde la API debe llamarse.
  nombre: string; // Nombre del producto, debe mapearse correctamente.
  precio: number; // Precio, asegurarse de manejar la conversión si es necesario.
  descripcion: string; // Descripción, debe coincidir con la API.
  imagen?: string; // URL de la imagen del producto, si la API la proporciona.
  vendedorId?: number;    //  para identificar al vendedor
  publicado?: boolean;    // para productos visibles a clientes
  categoria?: string;
  stock: number;
  ubicacion?: string;
  especificaciones?: string;
}
