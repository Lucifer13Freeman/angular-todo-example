import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input()
  public task!: Task;
  
  public isEditing: boolean = false;
  public editForm!: FormGroup;

  constructor(private readonly tasksService: TasksService) { }

  public ngOnInit(): void { 
    this.editForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }

  public changeStatus(): void {
    this.task.isCompleted = !this.task.isCompleted;
    this.tasksService.updateTask(this.task);
  }

  public edit(): void {
    this.isEditing = true;
    this.editForm.setValue({
      text: this.task.text
    });
  }

  public submit(): void {
    const { text } = this.editForm.value;
    this.task.text = text;
    this.tasksService.updateTask(this.task);
    this.reset();
  }

  public reset(): void {
    this.isEditing = false;
    this.editForm.reset();
  }

  public remove(): void {
    this.tasksService.removeTask(this.task);
  }
}
