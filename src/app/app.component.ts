import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
//comment
@Component({
  selector: 'app-root',
  template: `
  
  <h1> To-Do List<i class="fa fa-plus" aria-hidden="true" (click)="toggleNewTask()"> </i></h1>
  <div class="newTodo">
  <input class="newTask" [ngClass]="{ 'hidden': !newTaskOpen}"
    [(ngModel)]="taskText" placeholder="Enter New Task" 
    (keyUp.enter)="postTask()"
  />
  </div>

  <ul>
  <app-task 
    *ngFor="let n of taskList"
    [task]= 'n'
    (rekt)="deleteTask(n)"
    >
  </app-task>
  </ul>
  <button (click)="auth.signInWithGoogle()">SIGN IN</button> <button (click)="auth.signOut()">SIGN OUT</button>
  `,
  styles: [

  ]
})
export class AppComponent {

  constructor(public readonly auth: AuthService) {}
  title = 'todo';
  public taskText: string = "";
  public taskList: Task[] = [];
  public newTaskOpen: boolean = true;

  public postTask(): void{
    if (this.taskText.trim() == "") {
      this.taskText = "";
      return;
    }
    let nTask: Task = {isComplete: false, taskText: this.taskText}
    this.taskList.push(nTask);
    this.taskText = "";
    
  }

  public deleteTask(task: Task): void{
    let index = this.taskList.indexOf(task)
    if (index > -1) {
      this.taskList.splice(index,1)
    }
  }

  public toggleNewTask(): void {
    this.newTaskOpen = !this.newTaskOpen;
  }

}
export class Task {
  public isComplete: boolean = false;
  public taskText : string = "";

}
// test

