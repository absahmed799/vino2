import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBouteilleComponent } from './ajout-bouteille.component';

describe('AjoutBouteilleComponent', () => {
  let component: AjoutBouteilleComponent;
  let fixture: ComponentFixture<AjoutBouteilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutBouteilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutBouteilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
