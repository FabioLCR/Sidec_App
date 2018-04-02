import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-init';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InboxComponent } from './inbox/inbox.component';
import { NovaSolicitacaoComponent } from './nova-solicitacao/nova-solicitacao.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeadingComponent } from './heading/heading.component';


@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    NovaSolicitacaoComponent,
    PesquisaComponent,
    PageNotFoundComponent,
    HeadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
