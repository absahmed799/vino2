import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTrouverComponent } from './non-trouver.component';

describe('NonTrouverComponent', () => {
  let component: NonTrouverComponent;
  let fixture: ComponentFixture<NonTrouverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonTrouverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonTrouverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
