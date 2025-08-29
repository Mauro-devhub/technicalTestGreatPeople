import { Routes } from '@angular/router';
import { authenticationGuard } from './modules/shared/guards/authentication.guard';
import { roleGuard } from './modules/shared/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent),
    canActivate: [authenticationGuard],
    title: 'Dashboard',
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadComponent: () => import('./modules/products/pages/products/products.component').then(m => m.ProductsComponent),
      },
      {
        path: 'create-product',
        loadComponent: () => import('./modules/products/pages/create-product/create-product.component').then(m => m.CreateProductComponent),
        canActivate: [roleGuard],
        title: 'Crear producto'
      },
      {
        path: 'update-product/:id',
        loadComponent: () => import('./modules/products/pages/update-product/update-product.component').then(m => m.UpdateProductComponent),
        canActivate: [roleGuard],
        title: 'Actualizar Producto'
      }
    ]
  }
];
