import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpComponent } from './help.component';
import { IonicModule } from '@ionic/angular';
import { SharedUiModule } from '../../../shared-ui/src';
import { RouterTestingModule } from '@angular/router/testing';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        SharedUiModule,
        RouterTestingModule
      ],
      declarations: [HelpComponent],

    }).compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
