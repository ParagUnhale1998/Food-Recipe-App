import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAllMealsComponent } from './main-all-meals.component';

describe('MainAllMealsComponent', () => {
  let component: MainAllMealsComponent;
  let fixture: ComponentFixture<MainAllMealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAllMealsComponent]
    });
    fixture = TestBed.createComponent(MainAllMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
