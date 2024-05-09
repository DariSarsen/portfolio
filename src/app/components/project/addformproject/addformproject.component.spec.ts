import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddformprojectComponent } from './addformproject.component';

describe('AddformprojectComponent', () => {
  let component: AddformprojectComponent;
  let fixture: ComponentFixture<AddformprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddformprojectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddformprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
