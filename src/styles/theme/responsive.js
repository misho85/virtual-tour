// @ts-nocheck
import { css } from 'styled-components';

const sizes = {
  small: 352, // 22em
  phone: 576, // 36em
  tablet: 768, // 48em
  desktop: 992, // 62em
  wide: 1200, // 75em
  large: 1400, // 87.5em
  xLarge: 1800, // 112.5em
};

//
// ─── MEDIA QUERIES ──────────────────────────────────────────────────────────────
//

const minWidth = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (min-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const maxWidth = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (max-width: ${(sizes[label] - 0.02) / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

// ────────────────────────────────────────────────────────────────────────────────

export default {
  minWidth,
  maxWidth,
};
