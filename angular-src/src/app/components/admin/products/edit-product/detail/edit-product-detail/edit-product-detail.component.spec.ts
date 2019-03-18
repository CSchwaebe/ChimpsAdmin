import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductDetailComponent } from './edit-product-detail.component';

describe('EditProductDetailComponent', () => {
  let component: EditProductDetailComponent;
  let fixture: ComponentFixture<EditProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
