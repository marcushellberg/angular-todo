import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

const API_URL = 'http://localhost:5000/todos';

interface Todo {
  id?: string;
  task: string;
}

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
})
export class TodoViewComponent implements OnInit {
  taskForm = new FormGroup({
    task: new FormControl(''),
  });

  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(API_URL).subscribe((todos: Todo[]) => (this.todos = todos));
  }

  async addTodo() {
    const { task } = this.taskForm.value;

    this.http
      .post(API_URL, task)
      .subscribe((todo: Todo) => (this.todos = [...this.todos, todo]));

    this.taskForm.setValue({ task: '' });
  }

  async clearTodo(id: string) {
    this.http
      .delete(`${API_URL}/${id}`)
      .subscribe((_) => (this.todos = this.todos.filter((t) => t.id !== id)));
  }
}
