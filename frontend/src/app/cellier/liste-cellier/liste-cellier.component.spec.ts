import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCellierComponent } from './liste-cellier.component';

describe('ListeCellierComponent', () => {
  let component: ListeCellierComponent;
  let fixture: ComponentFixture<ListeCellierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCellierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCellierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
