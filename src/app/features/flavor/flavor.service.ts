import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Flavor, FlavorId, FlavorWithId } from './flavor.model';

@Injectable({
  providedIn: 'root',
})
export class FlavorService {
  private collection: AngularFirestoreCollection<Flavor>;

  constructor(private readonly db: AngularFirestore) {
    this.collection = db.collection<Flavor>('flavors');
  }

  public addFlavor(flavor: Flavor) {
    return from(this.collection.add(flavor)).pipe(
      map((flavorRef) => flavorRef.id)
    );
  }

  public getFlavors(): Observable<FlavorWithId[]> {
    return this.collection.snapshotChanges().pipe(
      map((flavors) =>
        flavors.map((flavor) => ({
          id: flavor.payload.doc.id,
          ...flavor.payload.doc.data(),
        }))
      )
    );
  }

  public deleteFlavor(id: FlavorId) {
    return from(this.db.doc(`flavors/${id}`).delete());
  }
}
