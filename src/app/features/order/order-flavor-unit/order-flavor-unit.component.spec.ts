import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFlavorUnitComponent } from './order-flavor-unit.component';

describe('OrderFlavorUnitComponent', () => {
  let component: OrderFlavorUnitComponent;
  let fixture: ComponentFixture<OrderFlavorUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFlavorUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFlavorUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
