import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteteAuthComponent } from './entete-auth.component';

describe('EnteteAuthComponent', () => {
  let component: EnteteAuthComponent;
  let fixture: ComponentFixture<EnteteAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnteteAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnteteAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
