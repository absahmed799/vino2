import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerBouteilleComponent } from './supprimer-bouteille.component';

describe('SupprimerBouteilleComponent', () => {
  let component: SupprimerBouteilleComponent;
  let fixture: ComponentFixture<SupprimerBouteilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerBouteilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerBouteilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
