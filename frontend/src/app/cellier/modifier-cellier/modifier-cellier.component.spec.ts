import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCellierComponent } from './modifier-cellier.component';

describe('ModifierCellierComponent', () => {
  let component: ModifierCellierComponent;
  let fixture: ComponentFixture<ModifierCellierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCellierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCellierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
