import { newSpecPage } from '@stencil/core/testing';
import { ButtonComponent } from '../pfx-button';

describe('pfx-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ButtonComponent],
      html: `<pfx-button></pfx-button>`,
    });
    expect(page.root).toEqualHtml(`
      <pfx-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pfx-button>
    `);
  });
});
