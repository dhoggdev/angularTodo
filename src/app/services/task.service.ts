import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { Task } from '../task';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly firestore: AngularFirestore, private auth: AngularFireAuth) { }

  public async addTask( task: Task):Promise<DocumentReference> {
    task.created = new Date();
    const user = await this.auth.currentUser;
    const path = `users/${ user.uid }/tasks`;
    return this.firestore.collection<Task>(path).add(task);
  }

  public getTasks(): Observable<Task[]> {
    return this.auth.authState.pipe(
      filter(u => !!u),
      switchMap(u=> {
        const path = `users/${ u.uid }/tasks`;
        const tasks$ = this.firestore.collection<Task>(path, ref => ref.orderBy('created')).snapshotChanges();
        return tasks$.pipe(
          map(docs => {
            return docs.map(doc => {
              const task = <Task>doc.payload.doc.data();
              task.id = doc.payload.doc.id;
              return task;
            })
          })
        )
      })
    );
  }

  public async deleteTask(task: Task): Promise<void> {
    const user = await this.auth.currentUser;
    const path = `users/${ user.uid }/tasks/${ task.id }`;
    return this.firestore.doc<Task>(path).delete()
  }

  public async updateTask(task: Task): Promise<void> {
    const user = await this.auth.currentUser;
    const path = `users/${ user.uid }/tasks/${ task.id }`;
    return this.firestore.doc<Task>(path).update({isComplete: task.isComplete});
  }
}
