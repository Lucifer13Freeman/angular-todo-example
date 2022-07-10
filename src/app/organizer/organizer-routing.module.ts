import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../common/components/dumb/not-found/not-found.component';
import { OrganizerComponent } from './organizer.component';

const routes: Routes = [
  { path: '', component: OrganizerComponent },
  { path: '**', component: NotFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
