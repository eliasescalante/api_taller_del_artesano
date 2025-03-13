import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  showConfirmPassword: boolean = false;
  authForm!: FormGroup;
  isLogin = signal<boolean>(true);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  showPassword: boolean = false;
  authError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  toggleMode(isLoginMode: boolean): void {
    this.isLogin.set(isLoginMode); // Usamos el signal para actualizar el estado
    this.initForm(); // Re-inicializamos el formulario cuando cambiamos de modo
  }

  initForm(): void {
    if (this.isLogin()) {
      this.authForm = this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.email,  // Acepta cualquier dominio de correo
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
  
      // Limpiar cualquier error de confirmPassword si estamos en modo login
      this.authForm.get('confirmPassword')?.clearValidators();
      this.authForm.get('confirmPassword')?.updateValueAndValidity();
    } else {
      this.authForm = this.fb.group(
        {
          name: [
            '',
            [
              Validators.required,
              Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$'), // Acepta mayúsculas, minúsculas, acentos y espacios
            ],
          ],
          email: ['', [Validators.required, Validators.email]], // Acepta todos los dominios de correo
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', Validators.required],
          role: ['cliente', Validators.required],
          businessName: ['', Validators.required], // Solo si el rol es vendedor
        },
        { validator: this.passwordMatchValidator }
      );
    }
  }
  

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { mismatch: true };
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRoleChange(event: any): void {
    const role = event.target.value;
    if (role === 'vendedor') {
      this.authForm.addControl(
        'businessName',
        new FormControl('', Validators.required)
      );
    } else {
      if (this.authForm.get('businessName')) {
        this.authForm.removeControl('businessName');
      }
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.errorMessage.set(
        'Por favor, completa todos los campos correctamente.'
      );
      return;
    }

    if (this.isLogin()) {
      const { email, password } = this.authForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.errorMessage.set(null); // Limpia el mensaje de error
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage.set('Correo o contraseña incorrectos.');
          console.log(err);
        },
      });
    } else {
      console.log('Registro exitoso');
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  getEmailTooltip() {
    const emailControl = this.authForm.get('email');
    if (emailControl?.touched || emailControl?.dirty) {
      if (emailControl?.hasError('required')) {
        return 'El correo es requerido';
      }
      if (emailControl?.hasError('email')) {
        return 'El formato del correo es inválido';
      }
    }
    return ''; // No mostrar tooltip si no hay errores
  }

  getPasswordTooltip() {
    const passwordControl = this.authForm.get('password');
    if (passwordControl?.touched || passwordControl?.dirty) {
      if (passwordControl?.hasError('required')) {
        return 'La contraseña es requerida';
      }
      if (passwordControl?.hasError('minlength')) {
        return 'La contraseña debe tener al menos 8 caracteres';
      }
      if (passwordControl?.hasError('pattern')) {
        return 'La contraseña debe contener mayúsculas, minúsculas, números y un carácter especial';
      }
    }
    return ''; // No mostrar tooltip si no hay errores
  }

  getConfirmPasswordTooltip() {
    const confirmPasswordControl = this.authForm.get('confirmPassword');
    if (confirmPasswordControl?.touched || confirmPasswordControl?.dirty) {
      if (confirmPasswordControl?.hasError('required')) {
        return 'Confirmación de contraseña es requerida';
      }
      if (confirmPasswordControl?.hasError('mismatch')) {
        return 'Las contraseñas no coinciden';
      }
    }
    return ''; // No mostrar tooltip si no hay errores
  }

  getNameTooltip() {
    const nameControl = this.authForm.get('name');
    if (nameControl?.touched || nameControl?.dirty) {
      if (nameControl?.hasError('required')) {
        return 'El nombre es requerido';
      }
      if (nameControl?.hasError('pattern')) {
        return 'Ingrese solo texto';
      }
    }
    return ''; // No mostrar tooltip si no hay errores
  }

  getRoleTooltip() {
    const roleControl = this.authForm.get('role');
    if (roleControl?.touched || roleControl?.dirty) {
      if (roleControl?.hasError('required')) {
        return 'El rol es requerido';
      }
    }
    return ''; // No mostrar tooltip si no hay errores
  }

  getBusinessNameTooltip() {
    const businessNameControl = this.authForm.get('businessName');
    if (businessNameControl?.touched || businessNameControl?.dirty) {
      if (businessNameControl?.hasError('required')) {
        return 'El nombre del negocio es requerido';
      }
    }
    return ''; // No mostrar tooltip si no hay errores
  }
}
