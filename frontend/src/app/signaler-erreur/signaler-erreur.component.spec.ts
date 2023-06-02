import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalerErreurComponent } from './signaler-erreur.component';

describe('SignalerErreurComponent', () => {
  let component: SignalerErreurComponent;
  let fixture: ComponentFixture<SignalerErreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalerErreurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalerErreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
