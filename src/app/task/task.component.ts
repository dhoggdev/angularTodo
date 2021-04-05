import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../app.component';


@Component({
  selector: 'app-task',
  template: `
  <li>
    <div [class.complete]="task.isComplete">
      <span (click)="toggleComplete(task)">
        <input type="checkbox" [(ngModel)]="task.isComplete"> 
        {{ chunkText(task.taskText) }} 
      </span>
    <span class="delBtn" (click)="deleteTask()"><i class="fa fa-ban"></i></span>
    </div>
  </li>
  `,
  styles: [
    `.complete {
      color: darkgreen;
      opacity: 0.5;
      text-decoration: line-through;
    }
    `
  ]
})
export class TaskComponent implements OnInit {
  @Input() public task: Task;
  @Output() public rekt: EventEmitter<void> = new EventEmitter();
  constructor() { }

  public deleteTask():void {
    this.rekt.emit()
  }

  public chunkText(s: string): string {
    if (s.length > 30) {
      s = s.slice(0,30) + "..."
    }
    return s
  }

  public toggleComplete(t: Task): void {
    t.isComplete = !t.isComplete;
  }

  ngOnInit(): void {
  }

}


