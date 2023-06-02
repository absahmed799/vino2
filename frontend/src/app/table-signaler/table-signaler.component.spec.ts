import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSignalerComponent } from './table-signaler.component';

describe('TableSignalerComponent', () => {
  let component: TableSignalerComponent;
  let fixture: ComponentFixture<TableSignalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSignalerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSignalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
