import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/smart/todo/todo.component';
import { ToDoRoutingModule } from './todo-routing.module';


@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule
  ],
  bootstrap: [
    TodoComponent
  ]
})
export class TodoModule { }
