import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-component',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent {
  @Input() value!: any;
  placeholder = input<string>();
  type = input<string>('text');
  readonly = input<boolean>(false);
  label = input<string>('');
  errorMessageInput = input<string>('');

  disabled: boolean = false;

  onChange = (_:any) => { };
  onTouch = () => { };

  constructor() { }

  ngOnInit() {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
   this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}