import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@pfx/angular';

@Component({
  selector: 'storybook-button',
  imports: [ComponentLibraryModule],
  standalone: true,
  template: `<pfx-button>Button</pfx-button>`,
  styleUrls: ['./button.css']
})
export default class ButtonComponent {
}
