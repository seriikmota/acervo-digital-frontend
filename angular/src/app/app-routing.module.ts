import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListagemDeUsuarioComponent} from "./listagem-de-usuario/listagem-de-usuario.component";

const routes: Routes =  [{path:'',pathMatch:"full",redirectTo:'usuario'},
  {path:'usuario', component:ListagemDeUsuarioComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
