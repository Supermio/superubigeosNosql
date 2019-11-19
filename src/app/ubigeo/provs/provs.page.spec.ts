import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvsPage } from './provs.page';

describe('ProvsPage', () => {
  let component: ProvsPage;
  let fixture: ComponentFixture<ProvsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
