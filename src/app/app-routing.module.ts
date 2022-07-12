import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPreloadingStrategy } from './app-preloading.strategy';
import { NotFoundComponent } from './modules/shared/components/common/not-found/not-found.component';


const routes: Routes = [  
  { 
    path: '', 
    redirectTo: '/todo', 
    pathMatch: 'full' 
  },
  { 
    path: 'calendar', 
    loadChildren: () => import('./modules/organizer/organizer.module').then(m => m.OrganizerModule) },
  { 
    path: 'todo', 
    loadChildren: () => import('./modules/todo/todo.module').then(m => m.TodoModule),
    data: { preload: true } 
  },
  { 
    path: 'stats', 
    loadChildren: () => import('./modules/stats/stats.module').then(m => m.StatsModule) 
  },
  { 
    path: '**', 
    component: NotFoundComponent  
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: AppPreloadingStrategy 
    })
  ],
  providers: [AppPreloadingStrategy],
  exports: [RouterModule]
})
export class AppRoutingModule { }
