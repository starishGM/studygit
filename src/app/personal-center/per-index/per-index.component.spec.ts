import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerIndexComponent } from './per-index.component';

describe('PerIndexComponent', () => {
  let component: PerIndexComponent;
  let fixture: ComponentFixture<PerIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
