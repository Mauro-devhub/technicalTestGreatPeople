import { Component, EventEmitter, input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'header-component',
  imports: [
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  description = input<string>('');
  username = input<string>('');

  @Output() logout = new EventEmitter<void>();
}
