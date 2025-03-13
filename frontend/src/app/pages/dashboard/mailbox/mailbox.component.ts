import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mailbox',
  imports: [CommonModule],
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css',
})
export class MailboxComponent {
  activeTab: 'messages' | 'notifications' = 'messages';
// Arrays vacíos (descomenta para pruebas futuras)
messages: any[] = []; // <- Comentar: "Aquí van los mensajes del usuario"
notifications: any[] = []; // <- Comentar: "Aquí van las notificaciones del sistema"

  setActiveTab(tab: 'messages' | 'notifications') {
    this.activeTab = tab;
  }
}
