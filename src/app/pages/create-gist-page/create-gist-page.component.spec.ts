import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGistPageComponent } from './create-gist-page.component';

describe('CreateGistPageComponent', () => {
  let component: CreateGistPageComponent;
  let fixture: ComponentFixture<CreateGistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGistPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
