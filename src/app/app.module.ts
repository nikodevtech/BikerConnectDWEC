import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MenuComponent } from './core/menu/menu.component';
import { BienvenidaComponent } from './core/bienvenida/bienvenida.component';
import { FooterComponent } from './core/footer/footer.component';
import { guardAdministracionGuard } from './guards/guard-administracion.guard';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BienvenidaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [guardAdministracionGuard], 
  bootstrap: [AppComponent]
})
export class AppModule { }
