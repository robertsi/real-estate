import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMap } from './feature-map';

describe('FeatureMap', () => {
  let component: FeatureMap;
  let fixture: ComponentFixture<FeatureMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMap],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
