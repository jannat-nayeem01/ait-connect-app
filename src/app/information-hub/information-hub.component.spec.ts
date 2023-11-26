import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationHubComponent } from './information-hub.component';

describe('InformationHubComponent', () => {
  let component: InformationHubComponent;
  let fixture: ComponentFixture<InformationHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationHubComponent]
    });
    fixture = TestBed.createComponent(InformationHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
