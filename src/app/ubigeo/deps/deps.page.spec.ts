import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepsPage } from './deps.page';

describe('DepsPage', () => {
  let component: DepsPage;
  let fixture: ComponentFixture<DepsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
