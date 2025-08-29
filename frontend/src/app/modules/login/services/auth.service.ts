import { inject, Injectable, signal } from '@angular/core';
import { LoginUserDto } from '../dto/login-user.dto';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../shared/services/localstorage.service';
import { environment } from '../../../../../environments';
import { map, Observable } from 'rxjs';
import { JwtService } from '../../shared/services/jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localStorage = inject(LocalStorageService);
  jwtService = inject(JwtService);
  http = inject(HttpClient);
  router = inject(Router);
  userLogged = signal<{id: number, role: string, username: string} | null>(null);

  loginUser(user: LoginUserDto): Observable<{access_token: string}> {
    return this.http.post<{access_token: string}>(`${environment.apiUrl}auth`, user)
      .pipe(map(response => this.jwtService.decodeToken(response.access_token)));
  }

  setUser(user: {id: number, role: string, username: string}) {
    this.userLogged.set(user);
  }

  logout(): void {
    this.localStorage.removeItem('access_token');
    this.localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
