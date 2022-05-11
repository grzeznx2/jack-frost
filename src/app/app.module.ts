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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
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
