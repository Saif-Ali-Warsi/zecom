import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../core/models/task.model';
import { exhaustMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  isEdit = false;
  taskId!: string;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('todo', Validators.required)
  })

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.taskId = id;
    }

    if (!id) return;

    this.taskService.getTaskById(id).subscribe((task) => {
      this.form.patchValue(task);
    })

  }


  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;


    const taskData: Task = {
      id: this.taskId || Date.now().toString(),
      title: formValue.title || '',
      description: formValue.description || '',
      status: formValue.status as any

    };



    if (this.isEdit) {
      this.taskService.updateTask(this.taskId, taskData).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.addTask(taskData).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }

  }
}
