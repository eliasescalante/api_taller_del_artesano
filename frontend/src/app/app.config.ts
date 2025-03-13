import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimización de la detección de cambios
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true
    }),
    
    // Configuración del enrutador
    provideRouter(routes),
    
    // Configuración de HttpClient con interceptores (si los necesitas)
    provideHttpClient(      
      withInterceptors([authInterceptor])
  ),
  AuthGuard,
  importProvidersFrom(FormsModule)

  ]
};