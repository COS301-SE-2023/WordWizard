import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { IonicModule } from '@ionic/angular';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when clicked', () => {
    spyOn(component.event, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('button');

    buttonElement.click();

    expect(component.event.emit).toHaveBeenCalled();
  });

  it('should display the provided text', () => {
    const buttonText = 'Click Me';
    component.text = buttonText;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.textContent).toContain(buttonText);
  });
});
