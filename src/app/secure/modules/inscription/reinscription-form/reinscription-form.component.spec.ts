import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinscriptionFormComponent } from './reinscription-form.component';

describe('ReinscriptionFormComponent', () => {
  let component: ReinscriptionFormComponent;
  let fixture: ComponentFixture<ReinscriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReinscriptionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReinscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
