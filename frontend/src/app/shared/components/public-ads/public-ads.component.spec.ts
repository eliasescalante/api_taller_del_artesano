import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAdsComponent } from './public-ads.component';

describe('PublicAdsComponent', () => {
  let component: PublicAdsComponent;
  let fixture: ComponentFixture<PublicAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
