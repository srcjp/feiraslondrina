import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PropertyMapComponent } from './property/property-map.component';
import { PropertyFormComponent } from './property/property-form.component';
import { PropertyDetailComponent } from './property/property-detail.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'property', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'property', component: PropertyMapComponent },
  { path: 'property/new', component: PropertyFormComponent, canActivate: [AuthGuard] },
  { path: 'property/:id/edit', component: PropertyFormComponent, canActivate: [AuthGuard] },
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: '**', redirectTo: 'login' }
];
