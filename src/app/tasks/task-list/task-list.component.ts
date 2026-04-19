import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { RouterLink } from '@angular/router';
import { Task } from '../../core/models/task.model';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }


  ngOnInit() {
    this.loadTasks();
  }


  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data
    })
  }


  deleteTask(id: string) {
    if (confirm('Delete this tasks?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      })
    }
  }
}
