import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetailsComponent } from './tv-details.component';

describe('TvDetailsComponent', () => {
  let component: TvDetailsComponent;
  let fixture: ComponentFixture<TvDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
