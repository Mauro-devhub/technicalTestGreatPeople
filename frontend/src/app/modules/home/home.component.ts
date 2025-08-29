import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { LocalStorageService } from '../shared/services/localstorage.service';
import { AuthService } from '../login/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { OverviewContentComponent } from '../shared/components/overview-content/overview-content.component';

@Component({
  selector: 'dashboard-page',
  imports: [
    HeaderComponent,
    OverviewContentComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  localStorageService = inject(LocalStorageService);
  authService = inject(AuthService);
  username = signal<string>('');
  description = signal<string>('Gestiona tu inventario de productos');

  ngOnInit(): void {
    const user = this.localStorageService.getItem<{username: string}>('user');
    if (user ) {
      this.username.set(user.username);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
