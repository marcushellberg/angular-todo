import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const API_URL = 'https://vaadin-todo-api.herokuapp.com/todos';

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
    task: new FormControl('', [Validators.required]),
  });

  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Todo[]>(API_URL)
      .subscribe((todos: Todo[]) => (this.todos = todos));
  }

  async addTodo() {
    const { task } = this.taskForm.value;

    this.http.post<Todo>(API_URL, task).subscribe((todo: Todo) => {
      this.todos = [...this.todos, todo];
      this.taskForm.reset();
    });
  }

  async clearTodo(id: string) {
    this.http
      .delete(`${API_URL}/${id}`)
      .subscribe((_) => (this.todos = this.todos.filter((t) => t.id !== id)));
  }

  get task() {
    return this.taskForm.get('task');
  }
}
