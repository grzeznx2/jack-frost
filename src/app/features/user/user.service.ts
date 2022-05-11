import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, map, Observable, of } from 'rxjs';
import {
  CreateUser,
  Role,
  User,
  UserAfterRegister,
  UserId,
  UserPayload,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private collection: AngularFirestoreCollection<UserPayload>;

  constructor(private readonly db: AngularFirestore) {
    this.collection = db.collection<UserPayload>('users');
  }

  public setNewUser(
    id: UserId,
    idToDelete: UserId,
    data: {
      firstName: string;
      lastName: string;
      role: Role;
      hasActivatedAccount: boolean;
      email: string;
      likedFlavors: [];
      lastOrder: null;
    }
  ) {
    const { firstName, lastName, role, hasActivatedAccount, email } = data;

    this.db
      .collection('users')
      .doc(id)
      .set({
        firstName,
        lastName,
        hasActivatedAccount,
        role,
        email,
        likedFlavors: [],
        lastOrder: null,
      })
      .then(() => this.deleteUser(idToDelete));

    return of({ ...data, id });
  }

  public addUser(user: CreateUser) {
    const newUserData = {
      email: '',
      hasActivatedAccount: false,
      role: 'USER' as Role,
      likedFlavors: [],
      lastOrder: null,
    };

    const userToCreate: UserPayload = {
      ...user,
      ...newUserData,
    };

    return from(this.collection.add(userToCreate)).pipe(
      map((userRef) => ({ id: userRef.id, ...newUserData }))
    );
  }

  public getUserById(id: UserId) {
    return this.db
      .doc<UserAfterRegister>(`users/${id}`)
      .valueChanges()
      .pipe(
        map((res) => {
          if (res) {
            return { ...res, id };
          } else {
            throw new Error('Podany użytkownik nie istnieje');
          }
        })
      );
  }

  public getUser(query: CreateUser) {
    return this.db
      .collection<User>('users', (ref) =>
        ref
          .where('firstName', '==', query.firstName)
          .where('lastName', '==', query.lastName)
          .where('password', '==', query.password)
          .limit(1)
      )
      .snapshotChanges()
      .pipe(
        map((users) =>
          users.map((user) => ({
            ...user.payload.doc.data(),
            id: user.payload.doc.id,
          }))
        )
      );
  }

  public updateUser(id: UserId, updatedFields: Partial<UserAfterRegister>) {
    return this.db.doc(`users/${id}`).update(updatedFields);
  }

  public getUsers(): Observable<User[]> {
    return this.collection.snapshotChanges().pipe(
      map((users) =>
        users.map((user) => ({
          ...user.payload.doc.data(),
          id: user.payload.doc.id,
        }))
      )
    );
  }

  public deleteUser(id: UserId) {
    return this.db.doc(`users/${id}`).delete();
  }
}
