import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { PasswordService } from './password.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [IonicModule.forRoot(), HttpClientModule, ReactiveFormsModule],
      providers: [PasswordService],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
