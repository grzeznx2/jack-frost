import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UnitId } from '../unit.model';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitItemComponent {
  @Input() name!: string;
  @Input() id!: UnitId;
  @Input() weight!: number;
  @Output() unitSelected = new EventEmitter<UnitId>();

  selectUnit() {
    this.unitSelected.emit(this.id);
  }
}
