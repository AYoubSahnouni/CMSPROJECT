import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleAddEditComponent } from './tele-add-edit.component';

describe('TeleAddEditComponent', () => {
  let component: TeleAddEditComponent;
  let fixture: ComponentFixture<TeleAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeleAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
