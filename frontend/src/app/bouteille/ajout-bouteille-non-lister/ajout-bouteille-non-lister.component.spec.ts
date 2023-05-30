import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBouteilleNonListerComponent } from './ajout-bouteille-non-lister.component';

describe('AjoutBouteilleNonListerComponent', () => {
  let component: AjoutBouteilleNonListerComponent;
  let fixture: ComponentFixture<AjoutBouteilleNonListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutBouteilleNonListerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutBouteilleNonListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
