/**
 * @typedef {{
 *  color: string;
 *  image: string;
 * }} GenerateOptions
 */
/**
 * @typedef {{
 *  loadingElementId?: string;
 *  loadingColor?: string;
 *  loadingImage?: string;
 * }} LoadingPluginOptions
 */

/**
 *
 * @param {GenerateOptions} options
 */
function generateHtml({ color, image }) {
  return `<style>
  body,
  html,
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  .spinner-wrapper {
    width: 70px;
    opacity: 0;
    animation-name: fadeIn;
    animation-duration: 500ms;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    animation-delay: 500ms;
    animation-fill-mode: forwards;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .spinner {
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: ${color};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  </style>
  <div class="spinner-wrapper">
    <img src="${image}" width="70" height="70" style="margin-bottom: 16px" />
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>`;
}

/**
 *
 * @param {LoadingPluginOptions} options
 * @returns
 */
export default function createLoadingPlugin({
  loadingElementId = 'app',
  loadingColor = '#8abaf0',
  loadingImage = '/.well-known/service/blocklet/logo?imageFilter=resize&w=80',
} = {}) {
  const injectHtml = generateHtml({
    color: loadingColor,
    image: loadingImage,
  });

  return {
    name: 'blocklet:loading',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(`<div id="${loadingElementId}"></div>`, `<div id="${loadingElementId}">${injectHtml}</div>`);
    },
  };
}
