import { Component, EventEmitter, inject, input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginUserDto } from '../../../login/dto/login-user.dto';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'form-login-component',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent implements OnInit, OnDestroy {
  formLogin!: FormGroup;
  formBuilder = inject(FormBuilder);
  subscriptionFormLogin!: Subscription;

  @Output() setData = new EventEmitter<LoginUserDto>();

  errorUsernameField = signal<string>('');
  errorPasswordField = signal<string>('');

  isLoading = input<boolean>(false);

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.subscriptionFormLogin = this.formLogin.valueChanges.subscribe(() => {
      this.validationForms();
    });
  }

  validationForms(): void {
    if (this.formLogin.controls['username'].hasError('minlength') && this.formLogin.controls['username'].dirty) {
      this.errorUsernameField.set('El campo usuario debe tener minimo 4 caracteres');
    } else {
      this.errorUsernameField.set('');
    }

    if (this.formLogin.controls['password'].hasError('minlength') && this.formLogin.controls['password'].dirty) {
      this.errorPasswordField.set('El campo password debe tener minimo 4 caracteres');
    } else {
      this.errorPasswordField.set('');
    }
  }
  
  save(): void {
    this.validationForms();

    if (this.formLogin.invalid) return;

    this.setData.emit(this.formLogin.value);
  }

  ngOnDestroy(): void {
    this.formLogin.reset();
    this.subscriptionFormLogin.unsubscribe();
  }
}