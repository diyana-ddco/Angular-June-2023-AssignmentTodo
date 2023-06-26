import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../interfaces/Todo';
import { DetailMode } from '../interfaces/DetailMode';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnChanges {

  @Input() mode?: DetailMode;
  @Input() todo?: Todo;

  @Output() createTodoEvent = new EventEmitter<string>();
  @Output() updateTodoEvent = new EventEmitter<Todo>();
  @Output() closeDetailEvent = new EventEmitter<void>();

  DetailMode: typeof DetailMode = DetailMode;

  textValue: string = "";
  errorInfo: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    this.textValue = changes['todo']?.currentValue?.text || "";
  }

  onCreate() {
    if (this.validateTextValue()) {
      this.createTodoEvent.emit(this.textValue);
      this.textValue = "";
    }
  }

  onUpdate() {
    if (this.todo) {
      // update without mutating the model
      this.updateTodoEvent.emit({ ...this.todo, text: this.textValue });
    }
    this.closeDetail();
  }

  onCancel() {
    this.closeDetail();
  }

  private validateTextValue(): boolean {
    this.errorInfo = null;
    if (!this.textValue || this.textValue.trim() === "") {
      this.errorInfo = "Enter the content of the task!";
    }
    return this.errorInfo === null;
  }

  private closeDetail() {
    this.todo = undefined;
    this.closeDetailEvent.emit();
  }

}
