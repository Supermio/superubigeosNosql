import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistsPage } from './dists.page';

describe('DistsPage', () => {
  let component: DistsPage;
  let fixture: ComponentFixture<DistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
