import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectLikedFlavors } from 'src/app/store/auth';
import { FlavorWithId } from '../flavor/flavor.model';

@Pipe({
  name: 'splitFlavors',
})
export class SplitFlavorsPipe implements PipeTransform {
  constructor(private store: Store<AppState>) {}

  transform(allFlavors: FlavorWithId[] | null) {
    return this.store.select(selectLikedFlavors).pipe(
      map((likedFlavorsId) => {
        const likedFlavors: FlavorWithId[] = [];
        const restFlavors: FlavorWithId[] = [];

        if (allFlavors) {
          allFlavors.forEach((flavor) => {
            if (likedFlavorsId?.includes(flavor.id)) {
              likedFlavors.push(flavor);
            } else {
              restFlavors.push(flavor);
            }
          });
        }

        return { likedFlavors, restFlavors };
      })
    );
  }
}
