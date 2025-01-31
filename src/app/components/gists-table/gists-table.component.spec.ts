import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistsTableComponent } from './gists-table.component';

describe('GistsTableComponent', () => {
  let component: GistsTableComponent;
  let fixture: ComponentFixture<GistsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GistsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GistsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
