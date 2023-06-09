import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: ContentComponent},
  { path: 'list', component: ContentComponent},
  { path: 'add', component: AddComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'cart', component: CartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
