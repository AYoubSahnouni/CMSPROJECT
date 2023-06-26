import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateabonnementComponent } from './updateabonnement.component';

describe('UpdateabonnementComponent', () => {
  let component: UpdateabonnementComponent;
  let fixture: ComponentFixture<UpdateabonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateabonnementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateabonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
