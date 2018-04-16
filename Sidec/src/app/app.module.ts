import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatePTParserFormatter } from './conf/NgbDatePTParserFormatter';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from './conf/CustomDatepickerI18n';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-init';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InboxComponent } from './inbox/inbox.component';
import { NovaSolicitacaoComponent } from './nova-solicitacao/nova-solicitacao.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeadingComponent } from './heading/heading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InboxGridComponent } from './inbox/inbox-grid/inbox-grid.component';
import { InboxDescricaoSolicitacaoComponent } from './inbox/inbox-descricao-solicitacao/inbox-descricao-solicitacao.component';

@NgModule({
  declarations: [
    AppComponent,
    InboxComponent,
    NovaSolicitacaoComponent,
    PesquisaComponent,
    PageNotFoundComponent,
    HeadingComponent,
    InboxGridComponent,
    InboxDescricaoSolicitacaoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    [{provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter}],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
