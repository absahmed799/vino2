import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBouteilleComponent } from './modifier-bouteille.component';

describe('ModifierBouteilleComponent', () => {
  let component: ModifierBouteilleComponent;
  let fixture: ComponentFixture<ModifierBouteilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierBouteilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierBouteilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
