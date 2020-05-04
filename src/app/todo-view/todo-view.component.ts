import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  task = '';
  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(API_URL).subscribe((todos: Todo[]) => (this.todos = todos));
  }

  async addTodo(event: any) {
    event.preventDefault();
    this.http
      .post(API_URL, this.task)
      .subscribe((todo: Todo) => (this.todos = [...this.todos, todo]));
    this.task = '';
  }

  async clearTodo(id: string) {
    this.http
      .delete(`${API_URL}/${id}`)
      .subscribe((_) => (this.todos = this.todos.filter((t) => t.id !== id)));
  }

  updateTask(event: KeyboardEvent) {
    this.task = (event.target as HTMLInputElement).value;
  }
}
