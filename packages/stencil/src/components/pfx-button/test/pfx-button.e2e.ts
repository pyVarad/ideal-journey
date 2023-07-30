import { newE2EPage } from '@stencil/core/testing';

describe('pfx-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pfx-button></pfx-button>');

    const element = await page.find('pfx-button');
    expect(element).toHaveClass('hydrated');
  });
});
