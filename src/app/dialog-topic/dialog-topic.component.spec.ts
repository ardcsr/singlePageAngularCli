import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTopicComponent } from './dialog-topic.component';

describe('DialogTopicComponent', () => {
  let component: DialogTopicComponent;
  let fixture: ComponentFixture<DialogTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
