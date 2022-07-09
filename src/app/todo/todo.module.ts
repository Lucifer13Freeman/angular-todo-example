import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/smart/todo/todo.component';
import { ToDoRoutingModule } from './todo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [
    TodoComponent
  ]
})
export class TodoModule { }
