import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://acksession.vercel.app/icon.svg',
    brandTitle: 'Acksession',
    brandUrl: 'https://acksession.vercel.app',
  },
});
