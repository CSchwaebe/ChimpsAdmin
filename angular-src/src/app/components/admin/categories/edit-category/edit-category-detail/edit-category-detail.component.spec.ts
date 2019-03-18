import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryDetailComponent } from './edit-category-detail.component';

describe('EditCategoryDetailComponent', () => {
  let component: EditCategoryDetailComponent;
  let fixture: ComponentFixture<EditCategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
