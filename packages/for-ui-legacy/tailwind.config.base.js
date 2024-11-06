/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');
const { default: toColorValue } = require('tailwindcss/lib/util/toColorValue');
const { default: withAlphaVariable } = require('tailwindcss/lib/util/withAlphaVariable');

const plugin = require('tailwindcss/plugin');

// fontSizes is separated for the legacy support of fontSizes.
// Once repalcing done, this should be written in config directly.

const colors = {
  shade: {
    text: {
      dark: {
        default: 'var(--shade-text-dark-default)',
        disabled: 'var(--shade-text-dark-disabled)',
      },
      medium: {
        default: 'var(--shade-text-medium-default)',
      },
      light: {
        default: 'var(--shade-text-light-default)',
        disabled: 'var(--shade-text-light-disabled)',
      },
      white: {
        default: 'var(--shade-text-white-default)',
        disabled: 'var(--shade-text-white-disabled)',
      },
    },
    background: {
      dark: {
        default: 'var(--shade-background-dark-default)',
        hover: 'var(--shade-background-dark-hover)',
        disabled: 'var(--shade-background-dark-disabled)',
      },
      medium: {
        default: 'var(--shade-background-medium-default)',
        disabled: 'var(--shade-background-medium-disabled)',
      },
      light: {
        default: 'var(--shade-background-light-default)',
        hover: 'var(--shade-background-light-hover)',
      },
      white: {
        default: 'var(--shade-background-white-default)',
        hover: 'var(--shade-background-white-hover)',
        active: 'var(--shade-background-white-active)',
        disabled: 'var(--shade-background-white-disabled)',
      },
    },
    border: {
      dark: {
        default: 'var(--shade-border-dark-default)',
        disabled: 'var(--shade-border-dark-disabled)',
      },
      medium: {
        default: 'var(--shade-border-medium-default)',
        disabled: 'var(--shade-border-medium-disabled)',
      },
      light: {
        default: 'var(--shade-border-light-default)',
      },
    },
    icon: {
      dark: {
        default: 'var(--shade-icon-dark-default)',
        disabled: 'var(--shade-icon-dark-disabled)',
      },
      medium: {
        default: 'var(--shade-icon-medium-default)',
        active: 'var(--shade-icon-medium-active)',
        disabled: 'var(--shade-icon-medium-disabled)',
      },
      white: {
        default: 'var(--shade-icon-white-default)',
      },
    },
  },

  primary: {
    text: {
      dark: {
        default: 'var(--primary-text-dark-default)',
      },
    },
    background: {
      dark: {
        default: 'var(--primary-background-dark-default)',
        hover: 'var(--primary-background-dark-hover)',
        disabled: 'var(--primary-background-dark-disabled)',
      },
      light: {
        default: 'var(--primary-background-light-default)',
        hover: 'var(--primary-background-light-hover)',
      },
    },
    border: {
      dark: {
        default: 'var(--primary-border-dark-default)',
        disabled: 'var(--primary-border-dark-disabled)',
      },
      medium: {
        default: 'var(--primary-border-medium-default)',
        active: 'var(--primary-border-medium-active)',
      },
      light: {
        default: 'var(--primary-border-light-default)',
      },
    },
    icon: {
      dark: {
        default: 'var(--primary-icon-dark-default)',
      },
      medium: {
        default: 'var(--primary-icon-medium-default)',
      },
    },
  },

  secondary: {
    text: {
      dark: {
        default: 'var(--secondary-text-dark-default)',
      },
    },
    background: {
      dark: {
        default: 'var(--secondary-background-dark-default)',
        hover: 'var(--secondary-background-dark-hover)',
      },
      light: {
        default: 'var(--secondary-background-light-default)',
        hover: 'var(--secondary-background-light-hover)',
      },
    },
    border: {
      dark: {
        default: 'var(--secondary-border-dark-default)',
      },
      medium: {
        default: 'var(--secondary-border-medium-default)',
      },
      light: {
        default: 'var(--secondary-border-light-default)',
      },
    },
    icon: {
      dark: {
        default: 'var(--secondary-icon-dark-default)',
      },
      medium: {
        default: 'var(--secondary-icon-medium-default)',
      },
    },
  },

  negative: {
    text: {
      dark: {
        default: 'var(--negative-text-dark-default)',
      },
    },
    background: {
      dark: {
        default: 'var(--negative-background-dark-default)',
        hover: 'var(--negative-background-dark-hover)',
      },
      light: {
        default: 'var(--negative-background-light-default)',
        hover: 'var(--negative-background-light-hover)',
      },
    },
    border: {
      dark: {
        default: 'var(--negative-border-dark-default)',
      },
      medium: {
        default: 'var(--negative-border-medium-default)',
      },
      light: {
        default: 'var(--negative-border-light-default)',
      },
    },
    icon: {
      dark: {
        default: 'var(--negative-icon-dark-default)',
      },
      medium: {
        default: 'var(--negative-icon-medium-default)',
      },
    },
  },

  positive: {
    text: {
      dark: {
        default: 'var(--positive-text-dark-default)',
      },
    },
    background: {
      dark: {
        default: 'var(--positive-background-dark-default)',
      },
      light: {
        default: 'var(--positive-background-light-default)',
        hover: 'var(--positive-background-light-hover)',
      },
    },
    border: {
      medium: {
        default: 'var(--positive-border-medium-default)',
      },
      light: {
        default: 'var(--positive-border-light-default)',
      },
    },
    icon: {
      dark: {
        default: 'var(--positive-icon-dark-default)',
      },
      medium: {
        default: 'var(--positive-icon-medium-default)',
      },
    },
  },

  notice: {
    text: {
      dark: {
        default: 'var(--notice-text-dark-default)',
      },
    },
    background: {
      dark: {
        default: 'var(--notice-background-dark-default)',
      },
      light: {
        default: 'var(--notice-background-light-default)',
        hover: 'var(--notice-background-light-hover)',
      },
    },
    border: {
      medium: {
        default: 'var(--notice-border-medium-default)',
      },
      light: {
        default: 'var(--notice-border-light-default)',
      },
    },
    icon: {
      dark: {
        default: 'var(--notice-icon-dark-default)',
      },
      medium: {
        default: 'var(--notice-icon-medium-default)',
      },
    },
  },

  informative: {
    text: {
      dark: {
        default: 'var(--informative-text-dark-default)',
      },
    },
    background: {
      dark: {
        default: 'var(--informative-background-dark-default)',
      },
      light: {
        default: 'var(--informative-background-light-default)',
        hover: 'var(--informative-background-light-hover)',
      },
    },
    border: {
      medium: {
        default: 'var(--informative-border-medium-default)',
      },
      light: {
        default: 'var(--informative-border-light-default)',
      },
    },
    icon: {
      dark: {
        default: 'var(--informative-icon-dark-default)',
      },
      medium: {
        default: 'var(--informative-icon-medium-default)',
      },
    },
  },
};

const fontSizes = {
  xs: [
    '.625rem',
    {
      lineHeight: '1rem',
      letterSpacing: '.03em',
    },
  ],
  s: [
    '.75rem',
    {
      lineHeight: '1.25rem',
      letterSpacing: '.03em',
    },
  ],
  r: [
    '.875rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '0',
    },
  ],
  xr: [
    '1rem',
    {
      lineHeight: '1.75rem',
      letterSpacing: '0',
    },
  ],
  l: [
    '1.25rem',
    {
      lineHeight: '2rem',
      letterSpacing: '0',
    },
  ],
  xl: [
    '1.5rem',
    {
      lineHeight: '2.5rem',
      letterSpacing: '0',
    },
  ],
};

const borderColors = {
  transparent: 'transparent',
  shade: colors.shade.border,
  primary: colors.primary.border,
  secondary: colors.secondary.border,
  negative: colors.negative.border,
  positive: colors.positive.border,
  notice: colors.notice.border,
  informative: colors.informative.border,
};

const iconColors = {
  transparent: 'transparent',
  shade: colors.shade.icon,
  primary: colors.primary.icon,
  secondary: colors.secondary.icon,
  positive: colors.positive.icon,
  notice: colors.notice.icon,
  informative: colors.informative.icon,
  negative: colors.negative.icon,
};

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@4design/for-ui/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@4design/for-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    plugin(({ matchUtilities, theme, corePlugins }) => {
      matchUtilities(
        {
          icon: (value) => {
            if (!corePlugins('iconOpacity')) {
              return {
                color: toColorValue(value),
              };
            }

            return withAlphaVariable({
              color: value,
              property: 'color',
              variable: '--tw-color-opacity',
            });
          },
        },
        { values: flattenColorPalette(theme('iconColor')), type: 'color' },
      );
    }),
  ],
  theme: {
    textColor: {
      transparent: 'transparent',
      shade: colors.shade.text,
      primary: colors.primary.text,
      secondary: colors.secondary.text,
      negative: colors.negative.text,
      positive: colors.positive.text,
      notice: colors.notice.text,
      informative: colors.informative.text,
    },
    backgroundColor: {
      transparent: 'transparent',
      shade: colors.shade.background,
      primary: colors.primary.background,
      secondary: colors.secondary.background,
      negative: colors.negative.background,
      positive: colors.positive.background,
      notice: colors.notice.background,
      informative: colors.informative.background,
    },
    borderColor: borderColors,
    ringColor: borderColors,
    outlineColor: borderColors,
    iconColor: iconColors,
    fill: {
      inherit: 'inherit',
      ...iconColors,
    },
    fontSize: {
      xs: fontSizes.s,
      sm: fontSizes.s,
      base: fontSizes.r,
      lg: fontSizes.l,
      '2xl': fontSizes.xl,
      '3xl': fontSizes.xl,
      '4xl': fontSizes.xl,
      '5xl': fontSizes.xl,
      '6xl': fontSizes.xl,
      '7xl': fontSizes.xl,
      '8xl': fontSizes.xl,
      '9xl': fontSizes.xl,
      ...fontSizes,
    },
    extend: {
      borderRadius: {
        modal: '2rem',
        1: '.25rem',
        1.5: '.375rem',
        2: '.5rem',
        4: '1rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        24: '6rem',
        32: '8rem',
      },
      borderWidth: {
        3: '3px',
        6: '6px',
        7: '7px',
      },
      spacing: {
        100: '25rem',
        104: '26rem',
        108: '27rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
        124: '31rem',
        128: '32rem',
        132: '33rem',
        136: '34rem',
        140: '35rem',
        144: '36rem',
        148: '37rem',
        152: '38rem',
        156: '39rem',
        160: '40rem',
        164: '41rem',
        168: '42rem',
        172: '43rem',
        176: '44rem',
        180: '45rem',
        184: '46rem',
        188: '47rem',
        192: '48rem',
        196: '49rem',
        200: '50rem',
      },
      height: {
        'max-content': 'max-content',
      },
      minWidth: {
        1: '.25rem',
        2: '.5rem',
        4: '1rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
      },
      minHeight: {
        1: '.25rem',
        2: '.5rem',
        4: '1rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        1: '.25rem',
        2: '.5rem',
        4: '1rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
      },
      maxHeight: {
        1: '.25rem',
        2: '.5rem',
        4: '1rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
      },
      fontSize: {
        'icon-18': '18px !important',
        'icon-24': '24px !important',
        'icon-36': '36px !important',
        'icon-48': '48px !important',
        'icon-64': '64px !important',
        'icon-92': '92px !important',
      },
      boxShadow: {
        none: 'none',
        attractive: '0 2px 2px rgba(0, 0, 0, .05)',
        more: '0 8px 24px rgba(0, 0, 0, .1)',
        focused: '0 0 0 2px rgba(0, 0, 0, .12)',
      },
      fontFamily: {
        sans: ['YakuHanJP', 'Inter', 'Noto Sans JP', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', 'Noto Sans JP', ...defaultTheme.fontFamily.mono],
      },
      gridTemplateColumns: {
        'auto-1': 'repeat(auto-fill, minmax(80px, 1fr))',
        'auto-2': 'repeat(auto-fill, minmax(120px, 1fr))',
        'auto-3': 'repeat(auto-fill, minmax(160px, 1fr))',
        'auto-4': 'repeat(auto-fill, minmax(240px, 1fr))',
        'auto-5': 'repeat(auto-fill, minmax(320px, 1fr))',
        ...defaultTheme.gridTemplateColumns,
      },
      transformOrigin: {
        0: '0%',
      },
      opacity: {
        disabled: '.4',
      },
      outline: {
        focus: ['1px solid var(--primary-border-dark-default)', '1px'],
      },
      zIndex: {
        '-1': '-1',
        table: '900',
        header: '1100',
        sidebar: '1100',
        modal: '1300',
        toast: '1400',
        tooltip: '1500',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  variants: {
    backgroundColor: ['hover', 'focus', 'disabled', 'checked', 'active'],
    borderColor: ['hover', 'focus', 'focus-within', 'disabled'],
    borderWidth: ['hover', 'focus', 'checked'],
    boxShadow: ['hover', 'focus'],
    placeholderColor: ['focus', 'focus-within'],
    cursor: ['disabled'],
    textColor: ['hover', 'focus', 'disabled'],
    opacity: ['hover', 'disabled'],
  },
};
