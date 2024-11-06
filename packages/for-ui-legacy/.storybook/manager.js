import '@storybook/addon-backgrounds/register';
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'for-ui',
  }),
  panelPosition: 'bottom',
});
