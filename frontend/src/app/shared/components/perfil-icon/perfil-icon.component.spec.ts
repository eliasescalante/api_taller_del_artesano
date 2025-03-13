import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilIconComponent } from './perfil-icon.component';

describe('PerfilIconComponent', () => {
  let component: PerfilIconComponent;
  let fixture: ComponentFixture<PerfilIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
