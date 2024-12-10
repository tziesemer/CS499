import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRescueComponent } from './update-rescue.component';

describe('UpdateRescueComponent', () => {
  let component: UpdateRescueComponent;
  let fixture: ComponentFixture<UpdateRescueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRescueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
