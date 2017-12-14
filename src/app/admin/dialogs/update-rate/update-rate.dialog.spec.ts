import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRateDialog } from './update-rate.dialog';

describe('UpdateRateDialog', () => {
  let component: UpdateRateDialog;
  let fixture: ComponentFixture<UpdateRateDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRateDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
