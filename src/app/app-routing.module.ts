import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { FlavorsUnitsComponent } from './features/flavors-units/flavors-units.component';
import { OrderCreatorComponent } from './features/order/order-creator/order-creator.component';
import { OrderSummaryComponent } from './features/order/order-summary/order-summary.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { AuthGuard, RequiredAuthStatus } from './shared/guards/auth.guard';
import { RedirectGuard } from './shared/guards/redirect.guard';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  {
    path: 'order-creator',
    component: OrderCreatorComponent,
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    data: {
      requiredAuthStatus: RequiredAuthStatus.UNAUTHENTICATED,
    },
    component: RegisterComponent,
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    data: {
      requiredAuthStatus: RequiredAuthStatus.UNAUTHENTICATED,
    },
    component: LoginComponent,
  },
  {
    path: 'orders',
    component: OrderSummaryComponent,
  },
  {
    path: 'users',
    canActivate: [RoleGuard],
    data: { requiredRole: 'ADMIN' },
    component: UserListComponent,
  },
  {
    path: 'flavors-units',
    component: FlavorsUnitsComponent,
  },
  {
    path: '',
    canActivate: [RedirectGuard],
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
