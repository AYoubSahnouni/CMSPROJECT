import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementAddEditComponent } from './abonnement-add-edit.component';

describe('AbonnementAddEditComponent', () => {
  let component: AbonnementAddEditComponent;
  let fixture: ComponentFixture<AbonnementAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonnementAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
