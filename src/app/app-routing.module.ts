import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './common/components/dumb/not-found/not-found.component';


const routes: Routes = [
  { path: 'todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
