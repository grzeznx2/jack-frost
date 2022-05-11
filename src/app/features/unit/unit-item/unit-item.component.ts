import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectDeleteUnitLoading } from 'src/app/store/unit';
import { UnitId } from '../unit.model';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitItemComponent implements OnInit {
  @Input() name!: string;
  @Input() id!: UnitId;
  @Input() weight!: number;
  @Output() unitSelected = new EventEmitter<UnitId>();
  public loading$ = of(false);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectDeleteUnitLoading(this.id));
  }

  selectUnit() {
    this.unitSelected.emit(this.id);
  }
}
