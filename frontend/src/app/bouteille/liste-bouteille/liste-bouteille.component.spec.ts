import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBouteilleComponent } from './liste-bouteille.component';

describe('ListeBouteilleComponent', () => {
  let component: ListeBouteilleComponent;
  let fixture: ComponentFixture<ListeBouteilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBouteilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBouteilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
