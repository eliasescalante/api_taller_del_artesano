import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

declare const bootstrap: any;


@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  usuario = signal({
    username: 'Juan Perez',
    email: 'juan@example.com',
    birthDate: '1990-01-01',
    gender: 'Hombre',
    location: 'Argentina',
    bio: 'Apasionado por la Ceramica artesanal',
    businessName: '',
    profilePhoto: '',
    coverPhoto: ''
  });

  triggerFileInput(type: string) {
    const inputElement = document.querySelector(`input[type="file"][name="${type}"]`) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  }

  editMode = signal(false);

  editUser: any = {};

  ngOnInit(): void {}



  toggleEditMode(): void {
    if (!this.editMode()) {
      // Al ingresar a edición, copiamos los datos actuales
      this.editUser = { ...this.usuario() };
    }
    this.editMode.set(!this.editMode());
  }

  saveUserData(): void {
    this.usuario.set({ ...this.editUser });
    this.editMode.set(false);
  }

  cancelEditMode(): void {
    this.editMode.set(false);
  }

  onFileSelected(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Actualiza la imagen en el objeto de edición
        this.editUser = {
          ...this.editUser,
          [field]: reader.result as string
        };
      };
      reader.readAsDataURL(file);
    }
  }
  
  
}
