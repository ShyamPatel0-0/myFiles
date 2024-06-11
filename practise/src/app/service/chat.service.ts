import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  sendMessage(message: string) {
    const user = this.authService.getUser();
    return user.pipe(map(u => {
      if (u) {
        return this.afs.collection('messages').add({
          text: message,
          uid: u.uid,
          displayName: u.displayName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      return null;
    })).subscribe();
  }

  getMessages() {
    return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges();
  }

}
