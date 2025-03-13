import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { AuthService } from '../../../auth/auth.service';
import { GeoService } from '../../services/geo.service';
import { Country, State } from '../../models/country.model';


@Component({
  selector: 'app-public-ads',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './public-ads.component.html',
  styleUrl: './public-ads.component.css',
})
export class PublicAdsComponent {
  productForm: FormGroup;
  formVisible = false;
  selectedFile: File | null = null;
  useImageUrl = false;
  imagePreview: string | null = null;
  countries: Country[] = [];
  states: State[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private geoService: GeoService
  ) {
    this.countries = this.geoService.getCountries();
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [1, [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.maxLength(200)],
      imagen: [''],
      categoria: ['', Validators.required],
      stock: [null, [Validators.min(0)]],      especificaciones: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  preventNegative(event: KeyboardEvent): boolean {
    const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const isNegative = event.key === '-';
    
    // Bloquear el signo negativo y cualquier carácter no numérico
    if (isNegative || !allowedChars.includes(event.key)) {
        event.preventDefault();
        return false;
    }
    return true;
}

  ngOnInit() {
    this.productForm.get('country')?.valueChanges.subscribe(countryName => {
      this.states = this.geoService.getStatesByCountry(countryName);
      this.productForm.get('state')?.reset();
    });
  }

  // Alternar entre subir archivo y usar URL
  toggleImageInput(): void {
    this.useImageUrl = !this.useImageUrl;
    this.selectedFile = null; // Limpiar archivo seleccionado
    this.imagePreview = null; // Limpiar vista previa
    this.productForm.get('imagen')?.reset(); // Limpiar campo de URL
  }

  // Manejar la selección de archivos
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;

      // Convertir el archivo a una URL local
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Asignar la URL local
      };
      reader.readAsDataURL(file); // Leer el archivo como URL base64
    } else {
      this.selectedFile = null;
      this.imagePreview = null;
      alert('Por favor, selecciona un archivo de imagen válido.');
    }
  }
  toggleForm() {
    this.formVisible = !this.formVisible;
    if (!this.formVisible) {
      this.productForm.reset();
      this.selectedFile = null; // Limpiar el archivo seleccionado al cancelar
      this.imagePreview = null; // Limpiar la vista previa
      this.useImageUrl = false; // Restablecer la opción de URL
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.authService.currentUser$.subscribe((currentUser) => {
        if (currentUser) {
          const country = this.productForm.get('country')?.value;
          const state = this.productForm.get('state')?.value;
          const ubicacion = `${state}, ${country}`


          const newProduct: Product = {
            ...this.productForm.value,
            vendedorId: currentUser.id,
            publicado: true,
            id: 0,
            categoria: this.productForm.value.categoria,
            stock: this.productForm.value.stock || 0,
            ubicacion,
            especificaciones: this.productForm.value.especificaciones,
          } as Product;

          // Si se subió un archivo, usar la URL local
          if (this.selectedFile) {
            newProduct.imagen = this.imagePreview || undefined; // Convierte null a undefined
          }

          // Guardar el producto
          this.productService.addProduct(newProduct);
          this.toggleForm();
        }
      });
    }
  }
}
