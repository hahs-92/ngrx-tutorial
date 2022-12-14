import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuhtReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    //StoreModule.forFeature(AUTH_STATE_NAME, AuhtReducer),
    // EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forFeature([]),
  ],
})
export class AuthModule {}
