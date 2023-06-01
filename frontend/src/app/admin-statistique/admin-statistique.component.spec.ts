import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatistiqueComponent } from './admin-statistique.component';

describe('AdminStatistiqueComponent', () => {
  let component: AdminStatistiqueComponent;
  let fixture: ComponentFixture<AdminStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStatistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
