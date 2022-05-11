import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { exhaustMap, from, map, Subject, tap } from 'rxjs';

import { RegisterUser, User, UserCredentials } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public unsubscribeComponent$ = new Subject<void>();
  public unsubscribe$ = this.unsubscribeComponent$.asObservable();

  constructor(
    private userSevice: UserService,
    private afAuthservice: AngularFireAuth
  ) {}

  login({ email, password }: UserCredentials) {
    return from(
      this.afAuthservice.signInWithEmailAndPassword(email, password)
    ).pipe(
      exhaustMap((userCredentials) => {
        if (userCredentials.user?.uid) {
          return this.userSevice.getUserById(userCredentials.user?.uid);
        } else {
          throw Error('Nieprawidłowe dane logowania');
        }
      })
    );
  }

  logout() {
    return this.afAuthservice.signOut();
  }

  register(newUser: RegisterUser) {
    let oldUser: User;
    return this.userSevice.getUser(newUser).pipe(
      map((users) => users[0]),
      tap((user) => (oldUser = user)),
      exhaustMap((user) => {
        if (!user) {
          throw new Error(
            'Nie znaleziono użytkownika dla wprowadzonych danych.'
          );
        } else {
          return from(
            this.afAuthservice.createUserWithEmailAndPassword(
              newUser.email,
              newUser.password
            )
          );
        }
      }),
      exhaustMap((userCred) => {
        const { password, ...updatedUser } = newUser;
        return this.userSevice.setNewUser(userCred!.user!.uid, oldUser.id, {
          ...updatedUser,
          role: oldUser.role,
          hasActivatedAccount: true,
          likedFlavors: [],
          lastOrder: null,
        });
      })
    );
  }
}
