import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerComponent } from './supprimer.component';

describe('SupprimerComponent', () => {
  let component: SupprimerComponent;
  let fixture: ComponentFixture<SupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
