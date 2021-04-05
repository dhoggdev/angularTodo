import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';

import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

var firebaseConfig = {
  apiKey: "AIzaSyAnKuFNDlfAIz5MNsyAWh6TR4ePq4ryd5s",
  authDomain: "angulartodo-6eba1.firebaseapp.com",
  projectId: "angulartodo-6eba1",
  storageBucket: "angulartodo-6eba1.appspot.com",
  messagingSenderId: "491443888894",
  appId: "1:491443888894:web:676febd5ecfd8c9c623baf"
};

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
