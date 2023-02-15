import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NewContactsComponent } from './views/newmycontacts/new-mycontacts.component';
import { EditMycontactsComponent } from './views/edit-mycontacts/edit-mycontacts.component';
import { CadastrarContatoComponent } from './views/cadastrar-contato/cadastrar-contato.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    title: "Home | Mycontacts"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Mycontacts"
  },
  {
    path: 'cadastrar',
    component: CadastrarContatoComponent,
    title: "Cadastre-se | Mycontacts"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    title: "Painel de Controle | Mycontacts"
  },
  {
    path: 'dashboard/new',
    component: NewContactsComponent,
    canActivate: [ AuthGuard ],
    title: "Novo mycontacts | Mycontacts"
  },
  {
    path: 'dashboard/edit/:id',
    component: EditMycontactsComponent,
    canActivate: [ AuthGuard ],
    title: "Editar Mycontacts | Mycontacts"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
