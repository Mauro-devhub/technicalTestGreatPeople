import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'button-component',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  type = input<string>('');
  disabled = input<boolean>(false);

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  setClick(): void {
    this.onClick.emit();
  }
}
