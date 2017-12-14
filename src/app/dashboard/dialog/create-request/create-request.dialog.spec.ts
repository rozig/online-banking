import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestDialog } from './create-request.dialog';

describe('CreateRequestDialog', () => {
  let component: CreateRequestDialog;
  let fixture: ComponentFixture<CreateRequestDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRequestDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
