import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import './style.css';

export default createGlobalStyle`
  ${normalize}

  [hidden] {
    display: none !important;
    appearance: initial;
    background-color: initial;
    cursor: default;
    padding: initial;
    border: initial;
  }

   /*
    The following CSS rules leverage classes that are dynamically applied to elements by
    focus-visible-polyfill. The purpose of the polyfill is to hide or show focus rings for
    users based on  how they navigate the site. Generally, users who navigate with their
    keyboard will still see focus rings while users who navigate with mouse/touch will not.
    For more details: https://github.com/WICG/focus-visible
  */ 

  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }


  button.focus-visible,
  input.focus-visible + .checkable {
    outline: none;
    box-shadow: 0 0 0 2px #12222e;
  }

  /* remove arrows from number input */

  /* Chrome, Safari, Edge, Opera */
  input[type="number"]::-webkit-inner-spin-button, 
  input[type="number"]::-webkit-outer-spin-button { 
    appearance: none;
    margin: 0; 
  }

  /* Firefox */
  input[type="number"] {
    appearance: textfield;
  }

  html {
    box-sizing: border-box;

    /* https://www.smashingmagazine.com/2016/05/fluid-typography */
    font-size: calc(12px + (16 - 12) * (100vw - 350px) / (1920 - 350));
  }

  *, ::after, ::before {
    box-sizing: inherit;
  }

  body {
    /* font-variant-ligatures: none; */
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: ${p => p.theme.fonts.body};
    font-weight: normal;
    font-size: 1em;
    line-height: 1.2;
  }

  h1, h2, h3, h4, h5, h6  {
    line-height: 1.2;
    font-weight: 600;
    margin: 0;
    margin-bottom: 1em;
    color: ${p => p.theme.colors.grayDark};
  }

  h1 {
    font-family: ${p => p.theme.fonts.heading};
    font-size: 3.35em;
    font-weight: bold;
  }

  h2 {
    font-family: ${p => p.theme.fonts.heading};
    font-size: 2.625em;
  }

  h3 {
    font-family: ${p => p.theme.fonts.heading};
    font-size: 2.25em;
    text-transform: uppercase;
  }

  h4 {
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1.75em;
    text-transform: uppercase;
  }

  h5 {
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1.25em;
    text-transform: uppercase;
  }

  h6 {
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1em;
    text-transform: uppercase;
  }

  p {
    display: block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-family: ${p => p.theme.fonts.body};
    color: ${p => p.theme.colors.grayDark};
  }

  strong {
    font-weight: bold;
  }

  ul,
  ol {
    list-style-type: none;
    margin: 0;
    padding: 0
  }

  li {
    font-size: 1em;
    line-height: 1.2;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    background: none;
    border: none;
    appearance: none;
    border-radius: 0;
    resize: none;
    &:invalid {
      box-shadow: none;
    }
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    padding: 0;
    font-family: ${p => p.theme.fonts.body};
  }

  button, [type="button"], [type="reset"], [type="submit"] {
    appearance: none;
  }

  .fullscreen {
    height: 100%;
    width: 100%;
  }
`;
