import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { FlavorCreatorComponent } from './features/flavor/flavor-creator/flavor-creator.component';
import { FlavorItemComponent } from './features/flavor/flavor-item/flavor-item.component';
import { FlavorListComponent } from './features/flavor/flavor-list/flavor-list.component';
import { FlavorsUnitsComponent } from './features/flavors-units/flavors-units.component';
import { IsOrderAllowedPipe } from './features/order/is-order-allowed.pipe';
import { OrderCreatorComponent } from './features/order/order-creator/order-creator.component';
import { OrderFlavorUnitComponent } from './features/order/order-flavor-unit/order-flavor-unit.component';
import { OrderSelectedFlavorUnitComponent } from './features/order/order-selected-flavor-unit/order-selected-flavor-unit.component';
import { OrderSummaryComponent } from './features/order/order-summary/order-summary.component';
import { SplitFlavorsPipe } from './features/order/split-flavors.pipe';
import { UnitCreatorComponent } from './features/unit/unit-creator/unit-creator.component';
import { UnitItemComponent } from './features/unit/unit-item/unit-item.component';
import { UnitListComponent } from './features/unit/unit-list/unit-list.component';
import { UserCreatorComponent } from './features/user/user-creator/user-creator.component';
import { UserItemComponent } from './features/user/user-item/user-item.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { MaterialModule } from './material/material.module';
import { AppState } from './store/app.state';
import { AuthEffects, authReducer } from './store/auth';
import { FlavorEffects, flavorReducer } from './store/flavor';
import { OrderEffects, orderReducer } from './store/order';
import { StorageEffects, storageReducer } from './store/storage';
import { UnitEffects, unitReducer } from './store/unit';
import { userReducer } from './store/user';
import { UserEffects } from './store/user/user.effects';
import { MockButtonComponent } from './shared/mock-button/mock-button.component';

@NgModule({
  declarations: [
    AppComponent,
    FlavorItemComponent,
    FlavorListComponent,
    FlavorCreatorComponent,
    UnitItemComponent,
    UnitListComponent,
    UnitCreatorComponent,
    FlavorsUnitsComponent,
    UserCreatorComponent,
    UserListComponent,
    UserItemComponent,
    RegisterComponent,
    LoginComponent,
    OrderCreatorComponent,
    OrderFlavorUnitComponent,
    OrderSummaryComponent,
    SplitFlavorsPipe,
    OrderSelectedFlavorUnitComponent,
    IsOrderAllowedPipe,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MockButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      FlavorEffects,
      UnitEffects,
      UserEffects,
      AuthEffects,
      StorageEffects,
      OrderEffects,
    ]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
