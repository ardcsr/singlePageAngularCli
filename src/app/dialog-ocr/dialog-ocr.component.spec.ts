import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOcrComponent } from './dialog-ocr.component';

describe('DialogOcrComponent', () => {
  let component: DialogOcrComponent;
  let fixture: ComponentFixture<DialogOcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
