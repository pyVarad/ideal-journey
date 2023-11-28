import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularComponentLibrary } from '@pfx/angular';

@Component({
  selector: 'storybook-button',
  imports: [AngularComponentLibrary, CommonModule],
  standalone: true,
  template: `<pfx-button buttontype='callToAction'>Button</pfx-button>`,
  styleUrls: ['./button.css']
})
export default class ButtonComponent {
}
