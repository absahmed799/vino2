import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBouteilleComponent } from './ajouter-bouteille.component';

describe('AjouterBouteilleComponent', () => {
  let component: AjouterBouteilleComponent;
  let fixture: ComponentFixture<AjouterBouteilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterBouteilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterBouteilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
