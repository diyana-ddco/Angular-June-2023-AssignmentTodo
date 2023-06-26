import { Component } from '@angular/core';
import { Todo } from '../interfaces/Todo';
import { DetailMode } from '../interfaces/DetailMode';
import { TODOS } from '../mock-todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

  DetailMode: typeof DetailMode = DetailMode;

  todos: Todo[] = [...TODOS];

  selectedTodo?: Todo;

  selectTodo(todo: Todo | undefined) {
    this.selectedTodo = todo;
  }

  createTodo(text: string) {
    this.todos.push({id: this.todos.length, text: text, complete: false});
  }

  updateTodo(_todo: Todo) {
    this.todos = this.todos.map((todo) => (todo.id === _todo.id ? { ..._todo } : todo));
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(function( _todo ) {
      return _todo.id !== todo.id;
    });
  }

}
