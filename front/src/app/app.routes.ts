import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { RecoveryComponent } from './auth/recovery/recovery.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { FairMapComponent } from './fair/fair-map.component';
import { FairFormComponent } from './fair/fair-form.component';
import { FairListComponent } from './fair/fair-list.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'fair', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'fair', component: FairMapComponent },
  { path: 'fair/new', component: FairFormComponent, canActivate: [AuthGuard] },
  { path: 'fair/:id/edit', component: FairFormComponent, canActivate: [AuthGuard] },
  { path: 'fair/manage', component: FairListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
