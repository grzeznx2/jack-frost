import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FlavorId } from '../flavor.model';

@Component({
  selector: 'app-flavor-item',
  templateUrl: './flavor-item.component.html',
  styleUrls: ['./flavor-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlavorItemComponent implements OnInit {
  @Input() name!: string;
  @Input() id!: string;
  @Output() flavorSelected = new EventEmitter<FlavorId>();

  constructor() {}

  ngOnInit(): void {}

  selectFlavor() {
    this.flavorSelected.emit(this.id);
  }
}
