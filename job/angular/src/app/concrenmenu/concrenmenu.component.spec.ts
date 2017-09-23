import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcrenmenuComponent } from './concrenmenu.component';

describe('ConcrenmenuComponent', () => {
  let component: ConcrenmenuComponent;
  let fixture: ComponentFixture<ConcrenmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcrenmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcrenmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
