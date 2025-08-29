import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  const user = localStorageService.getItem<{id: number, role: string, username: string}>('user');

  if (user?.role == 'admin') {
    return true;
  }

  alert('permisos insuficientes para acceder a esta sección');
  router.navigate(['dashboard']);
  return false;
};
