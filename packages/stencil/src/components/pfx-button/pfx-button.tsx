import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'pfx-button',
  styleUrl: 'pfx-button.css',
  shadow: true,
})
export class ButtonComponent {

  /*
  * Button Type
  * The property defines the type of button. Valid values are
  * "primary", "callToAction", "outline" and "text".
  * Default value of the button is "primary".
  */
  @Prop() readonly buttontype: 'primary' | 'callToAction' | 'outline' | 'text' = "primary";


  render() {
    return (
      <Host>
        <button class={this.buttontype}>
          <slot />
        </button>
      </Host>
    );
  }
}
