import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TralerComponent } from './traler.component';

describe('TralerComponent', () => {
  let component: TralerComponent;
  let fixture: ComponentFixture<TralerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TralerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TralerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
