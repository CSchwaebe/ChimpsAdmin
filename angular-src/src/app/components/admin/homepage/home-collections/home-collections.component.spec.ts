import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCollectionsComponent } from './home-collections.component';

describe('HomeCollectionsComponent', () => {
  let component: HomeCollectionsComponent;
  let fixture: ComponentFixture<HomeCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
