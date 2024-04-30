import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPersonComponent } from './persons/components/list-person.component';
import { AddPersonComponent } from './persons/components/add-person.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  { path: 'persons', component: ListPersonComponent },
  { path: 'persons/add', component: AddPersonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },  
  { path: '**',  redirectTo: '' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
