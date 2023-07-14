import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { CauldronComponent } from './cauldron.component';

describe('CauldronComponent', () => {
  let component: CauldronComponent;
  let fixture: ComponentFixture<CauldronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CauldronComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CauldronComponent);
    component = fixture.componentInstance;
  });

  it('should create the CauldronComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the vocabulary word in the button', () => {
    const word = 'Test Word';
    component.vocab = { word: word };
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.box.word')).nativeElement;
    expect(buttonElement.textContent).toContain(word);
  });

  it('should display the vocabulary word in the modal', () => {
    const word = 'Test Word';
    component.vocab = { word: word };
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.word')).nativeElement;
    expect(modalElement.textContent).toContain(word);
  });
});
