import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../interfaces/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @Input() todos: Todo[] = [];

  @Output() selectTodoEvent = new EventEmitter<Todo>();
  @Output() deleteTodoEvent = new EventEmitter<Todo>();
  @Output() updateTodoEvent = new EventEmitter<Todo>();

  onSelect(todo: Todo): void {
    this.selectTodoEvent.emit(todo);
  }

  onComplete(todo: Todo): void {
    // update without mutating the model
    this.updateTodoEvent.emit({ ...todo, complete: !todo.complete });
  }

  onDelete(todo: Todo): void {
    this.deleteTodoEvent.emit(todo);
  }

}
