import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxComponent } from './inbox/inbox.component';
import { NovaSolicitacaoComponent } from './nova-solicitacao/nova-solicitacao.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent
  },
  {
    path: 'inbox',
    component: InboxComponent
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
