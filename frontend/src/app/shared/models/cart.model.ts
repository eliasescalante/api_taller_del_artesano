
export interface CartItem {

  producto: {
    id: number;
    nombre: string;
    precio: number;
    stock: number; 
    imagen?: string;
  };
  cantidad: number; 
  total: number;
}
