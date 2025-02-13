import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ContactComponent } from './shared/contact.component';
import { AdminComponent } from './shared/admin.component';
import { ErrorComponent } from './shared/error.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'contact', loadComponent: () => import('./shared/contact.component').then(r => r.ContactComponent) },
    { path: 'admin', loadComponent: () => import('./shared/admin.component').then(r => r.AdminComponent) },
    { path: '**', component: ErrorComponent }
];
