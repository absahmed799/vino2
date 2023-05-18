import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCellierComponent } from './ajouter-cellier.component';

describe('AjouterCellierComponent', () => {
  let component: AjouterCellierComponent;
  let fixture: ComponentFixture<AjouterCellierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCellierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterCellierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
