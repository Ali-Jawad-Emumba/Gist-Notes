import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistViewPageComponent } from './gist-view-page.component';

describe('GistViewPageComponent', () => {
  let component: GistViewPageComponent;
  let fixture: ComponentFixture<GistViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GistViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GistViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
