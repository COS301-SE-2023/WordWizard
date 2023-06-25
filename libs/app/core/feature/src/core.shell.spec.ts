import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { CoreShell } from './core.shell';

describe('CoreShell', () => {
  let component: CoreShell;
  let fixture: ComponentFixture<CoreShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoreShell],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

