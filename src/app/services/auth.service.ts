import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly afAuth: AngularFireAuth) { }

  public signedInUser$: Observable<firebase.User | null> = this.afAuth.authState;

  public signInWithGoogle(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
