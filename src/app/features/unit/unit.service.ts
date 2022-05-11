import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { Unit, UnitId, UnitWithId } from './unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private collection: AngularFirestoreCollection<Unit>;

  constructor(private readonly db: AngularFirestore) {
    this.collection = db.collection<Unit>('units');
  }

  public addUnit(unit: Unit) {
    return from(this.collection.add(unit)).pipe(map((unitRef) => unitRef.id));
  }

  public getUnits(): Observable<UnitWithId[]> {
    return this.collection.snapshotChanges().pipe(
      map((units) =>
        units.map((unit) => ({
          id: unit.payload.doc.id,
          ...unit.payload.doc.data(),
        }))
      )
    );
  }

  public deleteUnit(id: UnitId) {
    return this.db.doc(`units/${id}`).delete();
  }
}
