import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Task } from './task';
import { TaskService } from './services/task.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//comment
@Component({
  selector: 'app-root',
  template: `
  <div class="authWelcome" *ngIf="auth.signedInUser$ | async as user; else sign_in">
    ur in boi
  </div>
  <ng-template #sign_in>
    <img src="assets/googleDark/btn_google_signin_dark_normal_web.png" 
      (click)="auth.signInWithGoogle()" *ngIf="auth.signedInUser$"/> 
  </ng-template>
  <div class="innerBody">
    <h1> To-Do List<i class="fa fa-plus" aria-hidden="true" (click)="toggleNewTask()"> </i></h1>
    <div class="newTodo">
    <input class="newTask" [ngClass]="{ 'hidden': !newTaskOpen}"
      [(ngModel)]="taskText" placeholder="Enter New Task" 
      (keyUp.enter)="postTask()"
      *ngIf="auth.signedInUser$ | async"
    />
    </div>

    <ul *ngIf="auth.signedInUser$ | async">
    <app-task 
      *ngFor="let n of tasks$ | async; trackBy: taskTrack"
      [task]= 'n'
      (rekt)="deleteTask(n)"
      (update)="updateTask(n)"
      >
    </app-task>
    </ul>
    <button (click)="auth.signOut()">SIGN OUT</button>
    <p *ngIf="auth.signedInUser$ | async as user">User Name is, {{ user.displayName }}</p>
  </div>
  `,
  styles: [

  ]
})
export class AppComponent implements OnInit {

  constructor(public readonly auth: AuthService, public task: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.task.getTasks();
  }

  title = 'todo';
  public taskText: string = "";
  // public taskList: Task[] = [];
  public newTaskOpen: boolean = true;

  public tasks$: Observable<Task[]>;

  public taskTrack(index: number, task: Task): string {
    return task.id!;
  }

  public async postTask(): Promise<void>{
    if (this.taskText.trim() == "") {
      this.taskText = "";
      return;
    }
    let nTask: Task = {isComplete: false, taskText: this.taskText}
    // this.taskList.push(nTask);
    await this.task.addTask(nTask);
    this.taskText = "";
  }

  public async deleteTask(task: Task): Promise<void>{
    await this.task.deleteTask(task);
    // let index = this.taskList.indexOf(task)
    // if (index > -1) {
    //   this.taskList.splice(index,1)
    // }
  }

  public async updateTask(task: Task): Promise<void> {
    await this.task.updateTask(task);
  }

  public toggleNewTask(): void {
    this.newTaskOpen = !this.newTaskOpen;
  }

}

