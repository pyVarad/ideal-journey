import { Config } from '@stencil/core';
import { ValueAccessorConfig, angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [];
export const config: Config = {
  namespace: 'stencil',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      dir: 'dist'
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: '@pfx/core',
      directivesProxyFile: '../angular-library/projects/pfx-angular/src/lib/directives/components.ts',
      directivesArrayFile: '../angular-library/projects/pfx-angular/src/lib/directives/index.ts',
    }),
    reactOutputTarget({
      componentCorePackage: '@pfx/core',
      proxiesFile: '../react-library/src/components/index.ts',
      includeDefineCustomElements: true,
      includePolyfills: true
    })
  ],
  testing: {
    browserHeadless: "new",
  },
};
