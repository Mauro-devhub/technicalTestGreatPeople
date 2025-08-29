import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LocalStorageService } from "../services/localstorage.service";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../../login/services/auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const localStorageService = inject(LocalStorageService);
  const authServices = inject(AuthService);
  const token = localStorageService.getItem<string>('access_token');

  const cloned = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        alert('tiempo de sesión expiró, inicia sesión de nuevo');
        authServices.logout();
      }
      return throwError(() => error);
    })
  );
}