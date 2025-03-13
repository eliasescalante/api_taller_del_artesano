import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavsIconComponent } from './favs-icon.component';

describe('FavsIconComponent', () => {
  let component: FavsIconComponent;
  let fixture: ComponentFixture<FavsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavsIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
