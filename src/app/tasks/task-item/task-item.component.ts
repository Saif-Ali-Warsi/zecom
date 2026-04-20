import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../core/models/task.model';



@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

  @Input() task!: Task;

  @Output() delete = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.task.id);
  }

}
