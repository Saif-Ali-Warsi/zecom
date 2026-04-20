import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { RouterLink } from '@angular/router';
import { Task } from '../../core/models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  isLoaded = false;

  search$ = new Subject<string>();

  constructor(private taskService: TaskService) { }


  ngOnInit() {
    this.loadTasks();

    this.search$.pipe(

      debounceTime(300),//User types fast → only last value processed

      distinctUntilChanged(),//"task" → "task" → ignored

      switchMap((searchTerm) => {
        return this.taskService.getTasks().pipe(
          map(tasks => {
            if (!searchTerm) return tasks;
            return tasks.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
        );
      })

    ).subscribe((data) => {
      this.tasks = data;
    })
  }

  trackById(index: number, item: Task) {
    return item.id;
  }

  onSearch(event: any) {
    const value = event.target.value;
    this.search$.next(value); //Push new value into stream
  }


  loadTasks() {
    this.isLoaded = false;

    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.isLoaded = true;
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
