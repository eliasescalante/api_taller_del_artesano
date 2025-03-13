import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/user.model';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Usuarios predefinidos
  private users: User[] = [
    {
      id: 1,
      email: 'admin@ejemplo.com',
      password: '12345678',
      name: 'Admin',
      role: 'vendedor',
      businessName: 'Negocio Admin',
    },
    {
      id: 2,
      email: 'user@ejemplo.com',
      password: 'abcdefgh',
      name: 'Usuario',
      role: 'cliente',
    },
  ];

  // Inicializa el BehaviorSubject con el usuario guardado en localStorage (si existe)
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromLocalStorage()
  );
  currentUser$ = this.currentUserSubject.asObservable();

  // Obtiene el usuario desde localStorage
  private getUserFromLocalStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  // Método para validar el login
  login(email: string, password: string): Observable<User> {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user); // Actualiza el usuario actual
      return of(user);
    } else {
      return throwError(() => new Error('Credenciales incorrectas'));
    }
  }

  // Método para registrar un nuevo usuario
  register(newUser: User): Observable<User> {
    const exists = this.users.some((u) => u.email === newUser.email);
    if (exists) {
      return throwError(() => new Error('El email ya está registrado'));
    } else {
      this.users.push(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      this.currentUserSubject.next(newUser); // Actualiza el usuario actual
      return of(newUser);
    }
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Actualiza el perfil del usuario y lo guarda en localStorage
  updateUserProfile(updatedUser: User): Observable<User> {
    const index = this.users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...updatedUser,
        id: this.users[index].id, // Mantiene el ID original
      };
      localStorage.setItem('currentUser', JSON.stringify(this.users[index]));
      this.currentUserSubject.next(this.users[index]); // Actualiza el usuario actual
      return of(this.users[index]);
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }

  // Método para actualizar el usuario actual (por ejemplo, cambiar el rol)
  updateCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Busca un usuario por su ID
  getUserById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  // Método para verificar si hay un usuario logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

    // Método centralizado para actualizar el rol del usuario
    updateUserRole(role: string): Observable<User | null> {
      return this.getCurrentUser().pipe(
        take(1),
        tap(user => {
          if (user) {
            const updatedUser: User = { ...user, role };
            // Actualiza localStorage
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            // Notifica a otros componentes actualizando el BehaviorSubject
            this.updateCurrentUser(updatedUser);
          }
        })
      );
    }
  
}
