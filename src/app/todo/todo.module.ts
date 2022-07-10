import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoRoutingModule } from './todo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';


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
