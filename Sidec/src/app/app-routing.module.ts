import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxComponent } from './inbox/inbox.component';
import { NovaSolicitacaoComponent } from './nova-solicitacao/nova-solicitacao.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidecMainAppComponent } from './sidec-main-app/sidec-main-app.component';
import { LoadDomainsComponent } from './load-domains/load-domains.component';
import { InboxGridComponent } from './inbox/inbox-grid/inbox-grid.component';

const routes: Routes = [
  {
    path: '',
    component: LoadDomainsComponent
    
  },
  {
    path: 'inbox',
    component: InboxComponent,
    children: [
      {
          path: 'inbox-grid',
          component: InboxGridComponent,
      }
    ],
  },
  {
    path: 'load',
    component: LoadDomainsComponent
  },
  {
    path: 'NovaSolicitacao',
    component: NovaSolicitacaoComponent
  },
  {
    path: 'Pesquisa',
    component: PesquisaComponent,
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
