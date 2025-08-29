import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'text-area-component',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR, useExisting: TextAreaComponent, multi: true 
    }
  ]
})
export class TextAreaComponent {
  @Input() value!: any;
  placeholder = input<string>('');
  label = input<string>('');
  errorMessageTextarea = input<string>('');
  readonly = input<boolean>(false);

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
    this.registerOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
