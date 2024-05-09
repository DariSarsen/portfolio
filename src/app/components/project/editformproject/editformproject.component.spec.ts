import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformprojectComponent } from './editformproject.component';

describe('EditformprojectComponent', () => {
  let component: EditformprojectComponent;
  let fixture: ComponentFixture<EditformprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditformprojectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditformprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
