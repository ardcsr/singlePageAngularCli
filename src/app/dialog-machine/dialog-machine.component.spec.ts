import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMachineComponent } from './dialog-machine.component';

describe('DialogMachineComponent', () => {
  let component: DialogMachineComponent;
  let fixture: ComponentFixture<DialogMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
