import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectDeleteFlavorLoading } from 'src/app/store/flavor';
import { FlavorId } from '../flavor.model';

@Component({
  selector: 'app-flavor-item',
  templateUrl: './flavor-item.component.html',
  styleUrls: ['./flavor-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlavorItemComponent implements OnInit {
  public loading$ = of(false);
  @Input() name!: string;
  @Input() id!: string;
  @Output() flavorSelected = new EventEmitter<FlavorId>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectDeleteFlavorLoading(this.id));
  }

  selectFlavor() {
    this.flavorSelected.emit(this.id);
  }
}
