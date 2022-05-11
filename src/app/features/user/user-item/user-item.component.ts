import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User, UserId } from '../user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent implements OnInit {
  @Input() user!: User;
  @Output() userSelected = new EventEmitter<UserId>();

  constructor() {}

  ngOnInit(): void {}

  selectUser() {
    this.userSelected.emit(this.user.id);
  }
}
