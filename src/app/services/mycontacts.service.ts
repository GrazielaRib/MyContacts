import { NotificationService } from './notification.service';
import { Mycontacts } from '../models/mycontacts';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MycontactsService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public createMycontacts(mycontacts: Mycontacts): Observable<any> {
    const promise = this.firestore.collection("mycontacts").add(mycontacts);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("mycontacts").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const mycontacts: Mycontacts = doc.data() as Mycontacts;
          mycontacts.id = doc.id;
          return mycontacts;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("mycontacts").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const mycontacts: Mycontacts = doc.data() as Mycontacts;
        mycontacts.id = doc.id;
        return mycontacts;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public deleteMycontacts(id: string) {
    const promise = this.firestore.collection("mycontacts").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public updateMycontacts(mycontacts: Mycontacts) {
    const promise = this.firestore.collection("mycontacts").doc(mycontacts.id).update(mycontacts);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
