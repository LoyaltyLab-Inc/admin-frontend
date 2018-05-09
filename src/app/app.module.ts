import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SystemModule } from './system/system.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { UserContextService } from './shared/userContext.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SystemModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [UserContextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
