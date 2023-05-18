import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerCellierComponent } from './supprimer-cellier.component';

describe('SupprimerCellierComponent', () => {
  let component: SupprimerCellierComponent;
  let fixture: ComponentFixture<SupprimerCellierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerCellierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerCellierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
