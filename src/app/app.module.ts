import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AppState } from './store/app.state';
import { authReducer } from './store/auth';
import { flavorReducer } from './store/flavor';
import { orderReducer } from './store/order';
import { storageReducer } from './store/storage';
import { unitReducer } from './store/unit';
import { userReducer } from './store/user';
import { LoginComponent } from './features/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './features/auth/register/register.component';
import { FlavorCreatorComponent } from './features/flavor/flavor-creator/flavor-creator.component';
import { FlavorItemComponent } from './features/flavor/flavor-item/flavor-item.component';
import { FlavorListComponent } from './features/flavor/flavor-list/flavor-list.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, FlavorCreatorComponent, FlavorItemComponent, FlavorListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot<AppState>(
      {
        flavors: flavorReducer,
        units: unitReducer,
        users: userReducer,
        auth: authReducer,
        storage: storageReducer,
        orders: orderReducer,
      },
      {}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
