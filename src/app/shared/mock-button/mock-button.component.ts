import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-mock-button',
  templateUrl: './mock-button.component.html',
  styleUrls: ['./mock-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockButtonComponent {}
