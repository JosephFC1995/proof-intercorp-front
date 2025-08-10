import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateStatus } from './form-update-status';

describe('FormUpdateStatus', () => {
  let component: FormUpdateStatus;
  let fixture: ComponentFixture<FormUpdateStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
