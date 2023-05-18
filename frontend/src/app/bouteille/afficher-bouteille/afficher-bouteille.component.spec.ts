import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherBouteilleComponent } from './afficher-bouteille.component';

describe('AfficherBouteilleComponent', () => {
  let component: AfficherBouteilleComponent;
  let fixture: ComponentFixture<AfficherBouteilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherBouteilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherBouteilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
