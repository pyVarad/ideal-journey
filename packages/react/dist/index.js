import { createReactComponent } from './react-component-lib';
import { applyPolyfills, defineCustomElements } from '@pfx/core/loader';
applyPolyfills().then(() => defineCustomElements());
export const PfxButton = createReactComponent('pfx-button');
//# sourceMappingURL=index.js.map