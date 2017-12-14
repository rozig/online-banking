import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemDialog } from './add-item.component';

describe('AddItemDialog', () => {
  let component: AddItemDialog;
  let fixture: ComponentFixture<AddItemDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
