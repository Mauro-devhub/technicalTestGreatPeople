import { inject, Injectable } from "@angular/core";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  localStorage = inject(LocalStorageService);
  
  decodeToken(token: string): any {
    if (!token) {
      return null;
    }

    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    
    try {
      this.localStorage.setItem('access_token', token);
      this.localStorage.setItem('user', JSON.parse(decodedPayload));
    } catch (e) {
      return null;
    }
  }
}