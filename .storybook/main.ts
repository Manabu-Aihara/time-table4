import type { StorybookConfig } from "@storybook/react-vite";
import { build, mergeConfig } from "vite";
// @ts-check
/**
 * @type { import("@storybook/react/types").StorybookConfig}
 */
// module.exports = {
//   stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

//   addons: [
//     '@storybook/addon-essentials',
//     "storybook-addon-module-mock",
//     '@storybook/addon-mdx-gfm',
//     '@chromatic-com/storybook'
//   ],
//   core: {
//     builder: {
//       name: '@storybook/builder-vite',
//     },
//   },
//   async viteFinal(config, { configType }) {
//     const { mergeConfig } = await import('vite');
//     config.plugins = [...config.plugins]
//     if (process.env.NODE_ENV === 'production') {
//       config.build.chunkSizeWarningLimit = 1200
//     }
//     return mergeConfig(config, {
//       // Add dependencies to pre-optimization
//       // optimizeDeps: {
//       //   include: ['storybook-dark-mode'],
//       // },
//     });
//   },

//   framework: {
//     name: '@storybook/react-vite',
//     options: {}
//   },

//   docs: {},

//   typescript: {
//     reactDocgen: 'react-docgen-typescript'
//   }
// };

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    // {
    //   name: 'storybook-addon-vite-mock',
    //   options: {
    //     exclude: ({ id }) => id.includes(".stories."),
    //     // debugPath: "tmp",
    //   },
    // }
  ],
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        chunkSizeWarningLimit: 100000000
      },
    })
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
