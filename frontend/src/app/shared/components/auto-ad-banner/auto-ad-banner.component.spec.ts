import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAdBannerComponent } from './auto-ad-banner.component';

describe('AutoAdBannerComponent', () => {
  let component: AutoAdBannerComponent;
  let fixture: ComponentFixture<AutoAdBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoAdBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoAdBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
