import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTaskById(id: string) {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  addTask(task: Task) {
    return this.http.post(this.baseUrl, task);
  }

  updateTask(id: string, task: Task) {
    return this.http.put(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
