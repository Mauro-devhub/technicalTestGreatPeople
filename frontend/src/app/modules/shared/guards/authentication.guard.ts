import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const token = localStorageService.getItem('access_token');

  if (!token) {
    alert('El usuario debe estar logeado para acceder a esta sección');
    router.navigate(['login']);
    return false;
  }

  return true;
};
